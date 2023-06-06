const { InstanceStatus, TCPHelper } = require('@companion-module/base')

module.exports = {
	debug: function(message) {
		let self = this;
	
		if (self.config.verbose) {
			self.log('debug', message);
		}
	},

	initTCP: function() {
		let self = this;
	
		if (self.socket !== undefined) {
			self.socket.destroy();
			delete self.socket;
		}
	
		if (self.config.host) {
			self.socket = new TCPHelper(self.config.host, self.config.port);
	
			self.socket.on('error', function (err) {
				self.handleError(err);
			});
	
			self.socket.on('connect', function () {
				self.updateStatus(InstanceStatus.Ok);
				self.debug("Connected");
				self.getData();
			})
	
			self.socket.on('data', function (d) {
				let oldHasData = self.has_data = true;
				let data = String(d);
				let msg;
	
				// Debug recived packet
				self.debug('Packet received: %s', data);
	
				try {
					let data_split = data.split(')');
	
					for (let i = 0; i < data_split.length; i++) {
						let data_string = data_split[i].replace('(', '').replace(')', ''); //remove paraentheses
	
						if (data_string !== '"') {
							//self.debug('Received: %s', data_string);
	
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
	
								self.debug('data_cmd: %s', data_cmd);
	
								let data_cmd_parts = data_cmd.split('!');
								let data_cmd_function = data_cmd_parts[0]; // SHU
								let data_cmd_param = data_cmd_parts[1]; // 000
	
								//self.debug('Data Function: %s', data_cmd_function);
								//self.debug('Data Parameter: %s', data_cmd_param);
								//self.debug('Data Info: %s', data_cmd_info);
	
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
									self.setVariableValues({
										'shutter_closed': self.shutter_closed
									});
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
									self.setVariableValues({
										'power_state': self.power_state
									});
									self.checkFeedbacks('power_state');
								}
	
								if (data_cmd_function === 'SST+CONF') {
									//model, serial, etc. info
								}
	
								if (data_cmd_function === 'LVO') {
									//lens shift position info
									self.motorposition_v = data_cmd_param;
									self.setVariableValues({
										'motorposition_v': self.motorposition_v
									});
								}
	
								if (data_cmd_function === 'LHO') {
									//lens shift position info
									self.motorposition_h = data_cmd_param;
									self.setVariableValues({
										'motorposition_h': self.motorposition_h
									});
								}
	
								if (data_cmd_function === 'ZOM') {
									//lens shift position info
									self.motorposition_z = data_cmd_param;
									self.setVariableValues({
										'motorposition_z': self.motorposition_z
									});
								}
	
								if (data_cmd_function === 'FCS') {
									//lens shift position info
									self.motorposition_f = data_cmd_param;
									self.setVariableValues('motorposition_f', self.motorposition_f);
								}
							}
						}
					}
				}
				catch(error) {
					self.debug('Error processing data: %s', error);
					//self.updateStatus(InstanceStatus.Warning);
					self.log('warn', 'Error processing data: ' + error.toString());
					setTimeout(self.clearWarning.bind(self), 5000);
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
	
					self.debug("Network Warning", data);
					//self.updateStatus(InstanceStatus.Warning);
					self.log('warn', 'Warning ' + msg + ': ' + data);
	
					setTimeout(self.clearWarning.bind(self), 5000);
	
					self.debug('ChristiePj: Warning %s: %s', msg, data);
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
					self.debug('FYI command received:');
					self.debug('Type: %s', split_data[0]);
					self.debug('P1: %s', split_data[1]);
					self.debug('P2: %s', split_data[2]);
					self.debug('P3: %s', split_data[3]);
					self.debug('Msg: %s', msg);
	
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
	
							self.setVariableValues({
								'power_state': self.power_state
							});
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
	
							self.setVariableValues({
								'standby': self.standby
							});
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
	
							self.setVariableValues({
								'signal_state': self.signal_state
							});
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
	
							self.setVariableValues({
								'osd_enabled': self.osd_enabled
							});
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
	
							self.setVariableValues({
								'shutter_closed': self.shutter_closed
							});
							self.checkFeedbacks('shutter_closed');
							self.has_data = true;
							break;
	
						case '010': // Input
								self.input_channel = split_data[1];
								self.input_slot = choices.inputSelect[Number(split_data[3]) - 1].id;
								self.input_slot_label = choices.inputSelect[Number(split_data[3])-1].label;
	
								self.setVariableValues({
									'input_channel': self.input_channel,
									'input_slot': self.input_slot_label
								});
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
	
							self.setVariableValues({
								'pip_enabled': self.pip_enabled
							});
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
	
					self.debug('LPH command recived:');
					self.debug('Lamp 1: %s', split_data[0]);
					self.debug('Lamp 2: %s', split_data[1]);
					self.debug('Msg: %s', msg);
	
					self.lamp_1 = split_data[0];
					self.lamp_2 = split_data[1];
	
					self.setVariableValues({
						'lamp_1': self.lamp_1,
						'lamp_2': self.lamp_2
					});
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
	},

	setupInterval: function() {
		let self = this;
	
		if (self.INTERVAL !== null) {
			clearInterval(self.INTERVAL);
			self.INTERVAL = null;
		}
	
		if (!self.config.interval) {
			self.config.interval = 0;
		}
	
		self.config.interval = parseInt(self.config.interval);
	
		if (self.config.interval > 0) {
			self.log('info', `Starting Update Interval. Updating every ${self.config.interval}ms`);
			self.INTERVAL = setInterval(self.getData.bind(self), self.config.interval);
		}
	},

	stopInterval: function() {
		let self = this;
	
		self.log('info', 'Stopping Update Interval.');
	
		if (self.INTERVAL) {
			clearInterval(self.INTERVAL);
			self.INTERVAL = null;
		}	
	},

	handleError: function(err) {
		let self = this;
	
		let error = err.toString();
		let printedError = false;
	
		Object.keys(err).forEach(function(key) {
			if (key === 'code') {
				if (err[key] === 'ECONNREFUSED') {
					error = 'Unable to communicate with Device. Connection refused. Is this the right IP address?';
					self.log('error', error);
					self.updateStatus(InstanceStatus.ConnectionFailure);
					printedError = true;
					if (self.socket !== undefined) {
						self.socket.destroy();
					}
				}
				else if (err[key] === 'ETIMEDOUT') {
					error = 'Unable to communicate with Device. Connection timed out. Is it still online?';
					self.log('error', error);
					self.updateStatus(InstanceStatus.ConnectionFailure);
					printedError = true;
					if (self.socket !== undefined) {
						self.socket.destroy();
					}
				}
			}
		});
	
		if (!printedError) {
			self.updateStatus(InstanceStatus.ConnectionFailure);
			self.log('error', `Error: ${error}`);
		}
	
		self.log('error', `Stopping Update Interval due to internal error.`);
		self.stopInterval();
	},

	getData: function () {
		let self = this;
	
		//if you don't separate the command requests by at least 150ms, some projectors don't like it and won't respond
	
		setTimeout(self.getCommand.bind(self), 50, 'PWR');
		setTimeout(self.getCommand.bind(self), 200, 'SHU');
		setTimeout(self.getCommand.bind(self), 400, 'LVO');
		setTimeout(self.getCommand.bind(self), 650, 'LHO');
		setTimeout(self.getCommand.bind(self), 800, 'ZOM');
		setTimeout(self.getCommand.bind(self), 950, 'FCS');
	},
	
	getCommand: function(command) {
		let self = this;
	
		self.sendCommand('(' + command + '?)');
	},
	
	sendCommand: function(cmd) {
		let self = this;
	
		if (cmd !== undefined) {
			self.debug('Sending: ' + cmd);
			if (self.socket !== undefined && self.socket.isConnected) {
				self.log('debug', 'Sending cmd: ' + cmd);
				self.socket.send(cmd);
			}
			else {
				self.debug('Socket not connected :(');
			}
		}
	}
}