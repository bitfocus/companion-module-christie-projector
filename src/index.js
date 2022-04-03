// Roland-xs84h

const instance_skel = require('../../../instance_skel');

const tcp = require('../../../tcp');

const actions = require('./actions.js')
const feedbacks = require('./feedbacks.js')
const variables = require('./variables.js')
const presets = require('./presets.js')

var debug;
var log;

function instance(system, id, config) {
	let self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	return self;
}

instance.prototype.INTERVAL = null;

instance.prototype.lamp_1 = '';
instance.prototype.lamp_2 = '';
instance.prototype.power_state = '';
instance.prototype.standby = '';
instance.prototype.signal_state = '';
instance.prototype.osd_enabled = '';
instance.prototype.shutter_closed = '';
instance.prototype.input_channel = '';
instance.prototype.input_slot_label = '';
instance.prototype.pip_enabled = '';

instance.prototype.motorposition_h = '';
instance.prototype.motorposition_v = '';
instance.prototype.motorposition_f = '';
instance.prototype.motorposition_z = '';

instance.prototype.init = function() {
	let self = this;

	debug = self.debug;
	log = self.log;

	self.init_tcp();
	self.setupInterval();

	self.init_actions();
	self.init_feedbacks();
	self.init_variables();
	self.init_presets();

	self.checkFeedbacks();
	self.checkVariables();
}

instance.prototype.updateConfig = function(config) {
	let self = this;

	self.config = config;
	self.init_tcp();
	self.setupInterval();

	self.init_actions();
	self.init_feedbacks();
	self.init_variables();
	self.init_presets();

	self.checkFeedbacks();
	self.checkVariables();
}

// Return config fields for web config
instance.prototype.config_fields = function () {
	let self = this;
	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module controls some Christie projectors.'
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 6,
			regex: self.REGEX_IP
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'Target Port (Default = 3002)',
			width: 6,
			default: '3002',
			regex: self.REGEX_PORT
		},
		{
			type: 'text',
			id: 'intervalInfo',
			width: 12,
			label: 'Update Interval',
			value: 'Please enter the amount of time in milliseconds to request new information from the projector. Set to 0 to disable.',
		},
		{
			type: 'textinput',
			id: 'interval',
			label: 'Update Interval',
			width: 3,
			default: 5000
		}
		/*
		TODO this will be used to limit / selct the options acording to the projector series in use, need to find a event to trigger the assignments
		{
			type: 'dropdown',
			label: 'projector type',
			id: 'pjtype',
			width: 6,
			choices: [
				{ label: 'Boxer series', id: 'boxer' },
				{ label: 'M series', id: 'mseries' }
			]
		}
		*/
	]
};

instance.prototype.setupInterval = function() {
	let self = this;

	if (self.INTERVAL !== null) {
		clearInterval(self.INTERVAL);
		self.INTERVAL = null;
	}

	if (!self.config.interval) {
		self.config.interval = 0;
	}

	if (self.config.interval > 0) {
		self.INTERVAL = setInterval(self.getData.bind(self), self.config.interval);
	}
};

instance.prototype.stopInterval = function() {
	let self = this;

	self.log('info', 'Stopping Update Interval.');

	if (self.INTERVAL) {
		clearInterval(self.INTERVAL);
		self.INTERVAL = null;
	}	
}

// When module gets deleted
instance.prototype.destroy = function() {
	let self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
	}

	if (self.INTERVAL) {
		clearInterval(self.INTERVAL);
		self.INTERVAL = null;
	}

	debug("destroy", self.id);
};

instance.prototype.handleError = function(err) {
	let self = this;

	let error = err.toString();
	let printedError = false;

	Object.keys(err).forEach(function(key) {
		if (key === 'code') {
			if (err[key] === 'ECONNREFUSED') {
				error = 'Unable to communicate with Device. Connection refused. Is this the right IP address? Is it still online?';
				self.log('error', error);
				self.status(self.STATUS_ERROR);
				printedError = true;
				if (self.socket !== undefined) {
					self.socket.destroy();
				}
			}
			else if (err[key] === 'ETIMEDOUT') {
				error = 'Unable to communicate with Device. Connection timed out. Is this the right IP address? Is it still online?';
				self.log('error', error);
				self.status(self.STATUS_ERROR);
				printedError = true;
				if (self.socket !== undefined) {
					self.socket.destroy();
				}
			}
		}
	});

	if (!printedError) {
		self.status(self.STATUS_ERROR);
		self.log('error', `Error: ${error}`);
	}

	self.log('error', `Stopping Update Interval due to internal error.`);
	self.stopInterval();
};

instance.prototype.init_tcp = function() {
	let self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
		delete self.socket;
	}

	if (self.config.host) {
		self.socket = new tcp(self.config.host, self.config.port);

		self.socket.on('status_change', function (status, message) {
			self.status(status, message);
		});

		self.socket.on('error', function (err) {
			self.handleError(err);
		});

		self.socket.on('connect', function () {
			self.status(self.STATE_OK);
			debug("Connected");
			self.getData();
		})

		self.socket.on('data', function (d) {
			let oldHasData = self.has_data = true;
			let data = String(d);
			let msg;

			// Debug recived packet
			debug('Packet received: %s', data);

			try {
				let data_split = data.split(')');

				for (let i = 0; i < data_split.length; i++) {
					let data_string = data_split[i].replace('(', '').replace(')', ''); //remove paraentheses

					if (data_string !== '"') {
						//debug('Received: %s', data_string);

						if (data_string !== '') {
							let data_cmd;
							let data_cmd_info;
							if (data_string.indexOf(' ') > -1) {
								data_cmd = data_string.slice(0, data_string.indexOf(' ')); //get the first part before the first space
								data_cmd_info = data_string.slice(data_string.indexOf(' ') + 1) //get the rest
							}
							else {
								data_cmd = data_string;
							}

							debug('data_cmd: %s', data_cmd);

							let data_cmd_parts = data_cmd.split('!');
							let data_cmd_function = data_cmd_parts[0]; // SHU
							let data_cmd_param = data_cmd_parts[1]; // 000

							debug('Data Function: %s', data_cmd_function);
							debug('Data Parameter: %s', data_cmd_param);
							debug('Data Info: %s', data_cmd_info);

							let data_cmd_param_int = parseInt(data_cmd_param);

							if (data_cmd_function === 'SHU') {
								//shutter status
								switch(data_cmd_param_int) {
									case 0:
										self.shutter_closed = 'Open';
										break;
									case 1:
										self.shutter_closed = 'Closed';
										break;
									default:
										self.shutter_closed = '';
										break;
								}
								self.setVariable('shutter_closed', self.shutter_closed);
								self.checkFeedbacks('shutter_closed');
							}

							if (data_cmd_function === 'PWR') {
								//projector power status
								switch(data_cmd_param_int) {
									case 0:
									case 10:
									case 20:
									case 21:
									case 22:
									case 23:
										self.power_state = 'Off';
										break;
									case 01:
									case 11:
										self.power_state = 'On';
										break;
									default:
										self.power_state = '';
										break;
								}
								self.setVariable('power_state', self.power_state);
								self.checkFeedbacks('power_state');
							}

							if (data_cmd_function === 'SST+CONF') {
								//model, serial, etc. info
							}

							if (data_cmd_function === 'LVO') {
								//lens shift position info
								console.log(data_string);
								self.setVariable('motorposition_h', self.motorposition_h);
								self.setVariable('motorposition_v', self.motorposition_v);
								self.setVariable('motorposition_f', self.motorposition_f);
								self.setVariable('motorposition_z', self.motorposition_z);
							}
						}
					}
				}
			}
			catch(error) {
				debug('Error processing data: %s', error);
			}


			if (data.includes('ERR')) {
				let data2 = data.substring(data.indexOf('ERR') + 3 );

				if (data2.includes('001')) {
					msg = 'System Crash';
				}

				if (data2.includes('002')) {
					msg = 'System Warning';
				}

				if (data2.includes('003')) {
					msg = 'Invalid Parameter';
				}

				if (data2.includes('004')) {
					msg = 'Too Many Parameters';
				}

				if (data2.includes('005')) {
					msg = 'Too Few Parameters';
				}

				if (data2.includes('006')) {
					msg = 'Source Does Not Exist';
				}

				if (data2.includes('007')) {
					msg = 'Could Not Be Executed';
				}

				if (data2.includes('008')) {
					msg = 'Checksum Error';
				}

				if (data2.includes('009')) {
					msg = 'Unknown Request';
				}

				if (data2.includes('010')) {
					msg = 'Communication Error';
				}

				if (data2.includes('011')) {
					msg = 'RX Break';
				}

				if (data2.includes('012')) {
					msg = 'Supplementary Info';
				}

				debug("Network Warning", data);
				self.status(self.STATE_WARNING, 'Warning');
				self.log('warn', 'Warning ' + msg + ': ' + data);

				debug('ChristiePj: Warning %s: %s', msg, data);
			}

			if (data.includes("FYI")) { // Typical packet: '(0002FYI 001 002 003 004 "Some Message")'
				let split_data = [];
				let str = data.substring(data.indexOf('FYI') + 3 ); // Striped down to: ' 001 002 003 004 "Some Message")'

				let x = 0;
				let y = 0;

				// Saves FYI Command
				for (let i = 0; i < 4; i++) { 	// Striped down to: ' 001 002 003 004 "Some Message")'
					x = str.indexOf(' ') + 1; 		// Get first " "
					y = str.indexOf(' ', 1);			// Get seccond " "

					split_data[i] = str.substring(x, y); // Saves the data between two spaces, with above example '001'
					str = str.substring(y); 			// Saves the rest for next cycle: ' 002 003 004 "Some Message")'
				}

				// Saves FYI Message
				msg = data.substring(data.indexOf('"') + 1);	// Saves the data after the first " with above example: 'Some Message")'
				msg = msg.substring(0, msg.indexOf('"', 1)); 	// Saves the data between two ", with above example: 'Some Message'

				// Debugs packet and message to serial
				debug('FYI command received:');
				debug('Type: %s', split_data[0]);
				debug('P1: %s', split_data[1]);
				debug('P2: %s', split_data[2]);
				debug('P3: %s', split_data[3]);
				debug('Msg: %s', msg);

				// Detect FYI Message Type
				switch (split_data[0]) {

					case '001': // Power
						if (split_data[1] == '000') {
							self.power_state = 'Off';
						}
						else if (split_data[1] == '001') {
							self.power_state = 'On';
						}
						else if (split_data[1] == '002') {
							self.power_state = 'Boot';
						}
						else if (split_data[1] == '010') {
							self.power_state = 'Cool Down';
						}
						else if (split_data[1] == '011') {
							self.power_state = 'Warm Up';
						}

						self.setVariable('power_state', self.power_state);
						self.checkFeedbacks('power_state');
						self.has_data = true;
						break;

					case '002': // Proj. Address
						// Do something
						break;

					case '003': // Proj. Selected
						// Do something
						break;

					case '004': // Baud Rate
						// Do something
						break;

					case '005': // Standby
						if (split_data[1] == '000') {
							self.standby = 'Off';
						}
						else if (split_data[1] == '001') {
							self.standby = 'On';
						}

						self.setVariable('standby', self.standby);
						self.checkFeedbacks('standby');
						self.has_data = true;
						break;

					case '006': // Signal
						if (split_data[1] == '000') {
							self.signal_state = 'Good Signal';
						}
						else if (split_data[1] == '001') {
							self.signal_state = 'Signal Missing';
						}
						else if (split_data[1] == '002') {
							self.signal_state = 'Bad Sync';
						}

						self.setVariable('signal_state', self.signal_state);
						self.checkFeedbacks('signal_state');
						self.has_data = true;
						break;

					case '007': // OSD
						if (split_data[1] == '000') {
							self.osd_enabled = 'Off';
						}
						else if (split_data[1] == '001') {
							self.osd_enabled = 'On';
						}

						self.setVariable('osd_enabled', self.osd_enabled);
						self.checkFeedbacks('osd_enabled');
						self.has_data = true;
						break;

					case '009': // Shutter
						if (split_data[1] == '000') {
							self.shutter_closed = 'Open';
						}
						else if (split_data[1] == '001') {
							self.shutter_closed = 'Closed';
						}

						self.setVariable('shutter_closed', self.shutter_closed);
						self.checkFeedbacks('shutter_closed');
						self.has_data = true;
						break;

					case '010': // Input
							self.input_channel = split_data[1];
							self.input_slot = choices.inputSelect[Number(split_data[3]) - 1].id;
							self.input_slot_label = choices.inputSelect[Number(split_data[3])-1].label;

							self.setVariable('input_channel', self.input_channel);
							self.setVariable('input_slot', self.input_slot_label);
							self.checkFeedbacks('input_channel');
							self.checkFeedbacks('input_slot');
							self.has_data = true;
							break;

					case '011': // Picture Myte.
						// Do something
						break;

					case '012': // PIP
						if (split_data[1] == '000') {
							self.pip_enabled = 'Off';
						}
						else if (split_data[1] == '001') {
							self.pip_enabled = 'On';
						}

						self.setVariable('pip_enabled', self.pip_enabled);
						self.checkFeedbacks('pip_enabled');
						self.has_data = true;
						break;

					case '255': // General / Misc.
						// Do something
						break;

					default:
						break;
				}
			}

			if (data.includes("LPH")) {
				let split_data = [];
				let str = data.substring(data.indexOf('LPH') + 3 );

				let x = 0;
				let y = 0;

				for (let i = 0; i < 4; i++) { 	// Striped down to: ' 001 002 003 004 "Some Message")'
					x = str.indexOf(' ') + 1; 		// Get first " "
					y = str.indexOf(' ', 1);			// Get second " "

					split_data[i] = str.substring(x, y); // Saves the data between two spaces, with above example '001'
					str = str.substring(y); 			// Saves the rest for next cycle: ' 002 003 004 "Some Message")'
				}

				msg = data.substring(data.indexOf('"') + 1);	// Saves the data after the first " with above example: 'Some Message")'
				msg = msg.substring(0, msg.indexOf('"', 1)); 	// Saves the data between two ", with above example: 'Some Message'

				debug('LPH command recived:');
				debug('Lamp 1: %s', split_data[0]);
				debug('Lamp 2: %s', split_data[1]);
				debug('Msg: %s', msg);

				self.lamp_1 = split_data[0];
				self.lamp_2 = split_data[1];

				self.setVariable('lamp_1', self.lamp_1);
				self.setVariable('lamp_2', self.lamp_2);
				self.has_data = true;
			}

			// Might need some code to request current setup.
			// For now it should react to changes, but need someone to test to be sure.

			// Initial data from Christie
			if (oldHasData != self.has_data && self.has_data) {
				self.checkFeedbacks();
				self.checkVariables();
			}
		})
	}
};

instance.prototype.getData = function () {
	let self = this;

	//if you don't separate the command requests by at least 150ms, some projectors don't like it and won't respond

	setTimeout(self.getCommand.bind(self), 50, 'PWR');
	setTimeout(self.getCommand.bind(self), 200, 'SHU');
	setTimeout(self.getCommand.bind(self), 400, 'LVO');
};

instance.prototype.getCommand = function(command) {
	let self = this;

	self.sendCommand('(' + command + '?)');
};

// ##########################
// #### Instance Actions ####
// ##########################
instance.prototype.init_actions = function (system) {
	this.setActions(actions.setActions.bind(this)());
};

// ############################
// #### Instance Feedbacks ####
// ############################
instance.prototype.init_feedbacks = function (system) {
	this.setFeedbackDefinitions(feedbacks.setFeedbacks.bind(this)());
};

// ############################
// #### Instance Variables ####
// ############################
instance.prototype.init_variables = function () {
	this.setVariableDefinitions(variables.setVariables.bind(this)());
};

// Setup Initial Values
instance.prototype.checkVariables = function () {
	variables.checkVariables.bind(this)();
};

// ##########################
// #### Instance Presets ####
// ##########################
instance.prototype.init_presets = function () {
	this.setPresetDefinitions(presets.setPresets.bind(this)());
};

instance.prototype.sendCommand = function(cmd) {
	let self = this;

	if (cmd !== undefined) {
		debug('Sending: ' + command);
		if (self.socket !== undefined && self.socket.connected) {
			self.socket.send(cmd);
		}
		else {
			debug('Socket not connected :(');
		}
	}
}

instance_skel.extendedBy(instance);
exports = module.exports = instance;