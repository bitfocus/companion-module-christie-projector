const { test } = require('node:test')
const assert = require('node:assert/strict')
const net = require('node:net')
const vm = require('node:vm')
const fs = require('node:fs')
const { createRequire } = require('node:module')
const path = require('node:path')
const root = process.env.MODULE_SOURCE || path.resolve(__dirname, '..')
const load = createRequire(path.join(root, 'index.js'))
const sdk = load('@companion-module/base')
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
class HostBoundary {
	constructor() { this.values = {}; this.logs = [] }
	log(...args) { this.logs.push(args) }
	updateStatus(status) { this.status = status }
	setActionDefinitions(defs) { this.actions = defs }
	setFeedbackDefinitions(defs) { this.feedbacks = defs }
	setVariableDefinitions(defs) { this.variables = defs }
	setVariableValues(values) { Object.assign(this.values, values) }
	setPresetDefinitions(defs) { this.presets = defs }
	checkFeedbacks() {}
	parseVariablesInString() { throw Error('Entity text must already be prepared by API 1.13+ host') }
}
let Instance
vm.runInNewContext(fs.readFileSync(path.join(root, 'index.js'), 'utf8'), {
	require: (id) => id === '@companion-module/base' ? { ...sdk, InstanceBase: HostBoundary, runEntrypoint: (cls) => { Instance = cls } } : load(id),
	setInterval, clearInterval,
})

test('action wire encoding preserves numeric, dropdown and host-prepared text values', async () => {
	const instance = new Instance()
	instance.initActions()
	const sent = []
	instance.sendCommand = (cmd) => sent.push(cmd)
	await instance.actions.pwr.callback({ options: { p1: '1' } })
	await instance.actions.shu.callback({ options: { p1: '1' } })
	await instance.actions.brt.callback({ options: { p1: 505 } })
	await instance.actions.sinSlot.callback({ options: { target: 'MAIN', slot: '2', input: '3' } })
	await instance.actions.sinSlot.callback({ options: { target: 'PIIP', slot: '$(custom:literal)', input: '4' } })
	assert.deepEqual(sent, ['(PWR 1)', '(SHU 001)', '(BRT 0505)', '(SIN+MAIN 23)', '(SIN+PIIP $(custom:literal)4)'])
	assert.equal(instance.actions.sinSlot.options[0].useVariables, true)
})

test('actual TCPHelper: initial polling, response variables/feedback, reload, reconnect and cleanup', async () => {
	const sockets = new Set()
	let connections = 0
	let wire = ''
	const server = net.createServer((socket) => {
		connections++
		sockets.add(socket)
		socket.on('close', () => sockets.delete(socket))
		socket.on('data', (data) => {
			wire += data.toString()
			if (data.includes('(PWR?)')) socket.write('(PWR!001)(SHU!001)(LVO!123)(LHO!456)(ZOM!789)')
		})
	})
	await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
	const instance = new Instance()
	try {
		const config = { host: '127.0.0.1', port: server.address().port, interval: '1500', verbose: false }
		await instance.init(config)
		assert.ok(instance.INTERVAL)
		await sleep(2700)
		assert.ok(wire.split('(PWR?)').length >= 3, 'periodic polling continues')
		for (const query of ['PWR', 'SHU', 'LVO', 'LHO', 'ZOM', 'FCS']) assert.ok(wire.includes(`(${query}?)`), query)
		assert.equal(instance.values.power_state, 'On')
		assert.equal(instance.values.shutter_closed, 'Closed')
		assert.equal(instance.values.motorposition_v, '123')
		assert.equal(instance.values.motorposition_h, '456')
		assert.equal(instance.values.motorposition_z, '789')
		await instance.actions.pwr.callback({ options: { p1: '1' } })
		await sleep(50)
		assert.ok(wire.includes('(PWR 1)'))
		const colors = { fg1: 1, bg1: 2 }
		assert.deepEqual(await instance.feedbacks.power_state.callback({ options: colors }), { color: 1, bgcolor: 2 })
		assert.deepEqual(await instance.feedbacks.power_state.callback({ options: { ...colors, bg1: 3 } }), { color: 1, bgcolor: 3 })
		await instance.configUpdated({ ...config, interval: '0' })
		await sleep(1100)
		assert.equal(instance.INTERVAL, null)
		assert.ok(connections >= 2)
		const before = connections
		for (const socket of sockets) socket.destroy()
		// Let the reconnect polling burst settle before orderly shutdown.
		await sleep(3500)
		assert.ok(connections > before, 'TCPHelper reconnects after remote close')
	} finally {
		await instance.destroy()
		assert.equal(instance.INTERVAL, null)
		await sleep(1100)
		for (const socket of sockets) socket.destroy()
		await new Promise((resolve) => server.close(resolve))
	}
})
