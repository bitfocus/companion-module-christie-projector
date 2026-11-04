const { test } = require('node:test')
const assert = require('node:assert/strict')
const { initActions } = require('../src/actions.js')

test('slot/input preserves host-prepared literal values', async () => {
	const sent = []
	const instance = {
		sendCommand: (command) => sent.push(command),
		setActionDefinitions(definitions) { this.actions = definitions },
		parseVariablesInString() { throw Error('Host-prepared text must not be parsed again') },
	}
	initActions.call(instance)
	await instance.actions.sinSlot.callback({ options: { target: 'MAIN', slot: '2', input: '3' } })
	await instance.actions.sinSlot.callback({ options: { target: 'PIIP', slot: '$(custom:literal)', input: '4' } })
	assert.deepEqual(sent, ['(SIN+MAIN 23)', '(SIN+PIIP $(custom:literal)4)'])
})
