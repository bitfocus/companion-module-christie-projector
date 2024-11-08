//Christie-Projector

const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const UpgradeScripts = require('./src/upgrades')

const config = require('./src/config')
const actions = require('./src/actions')
const feedbacks = require('./src/feedbacks')
const variables = require('./src/variables')
const presets = require('./src/presets')

const util = require('./src/util')
const api = require('./src/api')

class christiePjInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...config,
			...actions,
			...feedbacks,
			...variables,
			...presets,
			...util,
			...api
		})

		this.INTERVAL = null;

		this.lamp_1 = '';
		this.lamp_2 = '';
		this.power_state = '';
		this.standby = '';
		this.signal_state = '';
		this.osd_enabled = '';
		this.shutter_closed = '';
		this.input_channel = '';
		this.input_slot_label = '';
		this.pip_enabled = '';

		this.motorposition_h = '';
		this.motorposition_v = '';
		this.motorposition_z = '';
		this.motorposition_f = '';

		this.signal_state = '';
		this.input_frequency = '';
		this.sync_width = '';
		this.sync_type = '';
		this.signal_type = '';
		this.pixel_rate = '';
		this.pip_signal_state = '';
		this.pip_input_frequency = '';
		this.pip_sync_width = '';
		this.pip_sync_type = '';
		this.pip_signal_type = '';
		this.pip_pixel_rate = '';
	}

	async destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy();
		}
	
		if (this.INTERVAL) {
			clearInterval(this.INTERVAL);
			this.INTERVAL = null;
		}
	}

	async init(config) {
		this.configUpdated(config);
	}

	async configUpdated(config) {
		this.config = config;

		if (this.config.verbose) {
			this.log('info', 'Verbose mode enabled. Log entries will contain detailed information.');
		}
	
		this.updateStatus(InstanceStatus.Connecting);
	
		this.initTCP();
		this.setupInterval();

		this.initActions();
		this.initFeedbacks();
		this.initVariables();
		this.initPresets();

		this.checkFeedbacks();
		this.checkVariables();
	}
}

runEntrypoint(christiePjInstance, UpgradeScripts);