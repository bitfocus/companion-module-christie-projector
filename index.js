var tcp = require('../../tcp');
var instance_skel = require('../../instance_skel');
var debug;
var log;

function pad2(num) {
	var s = "00" + num;
	return s.substr(s.length-2);
}

function pad3(num) {
	var s = "000" + num;
	return s.substr(s.length-3);
}

function pad4(num) {
	var s = "0000" + num;
	return s.substr(s.length-4);
}

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	self.actions(); // export actions

	return self;
}

instance.prototype.updateConfig = function(config) {
	var self = this;

	self.config = config;
	self.init_tcp();
};

instance.prototype.init = function() {
	var self = this;

	debug = self.debug;			// Normal Debug (keep uncomented as default)
//	debug = console.log;	// Simple perminent printing of debug options to terminal/CMD
	log = self.log;

	self.status(1,'Connecting'); 	// Status ok!
	self.init_tcp();							// Init TCP
	self.update_variables(); 			// Export Variables
	self.checkFeedbacks();				// Export Feedbacks
	self.init_presets();					// Export Presets
};

instance.prototype.init_tcp = function() {
	var self = this;

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
			debug("Network error", err);
			self.status(self.STATE_ERROR, err);
			self.log('error',"Network error: " + err.message);
		});

		self.socket.on('connect', function () {
			self.status(self.STATE_OK);
			debug("Connected");
		})

		self.socket.on('data', function (d) {
			var oldHasData = self.has_data = true;
			var data = String(d);
			var msg;

			// Debug recived packet
			debug('Packet recived: %s', data);

			if (data.includes('ERR')) {
				var data2 = data.substring(data.indexOf('ERR') + 3 );

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
				var split_data = [];
				var str = data.substring(data.indexOf('FYI') + 3 ); // Striped down to: ' 001 002 003 004 "Some Message")'

				var x = 0;
				var y = 0;

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
				debug('FYI command recived:');
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
							self.input_slot = self.inputSelect[Number(split_data[3]) - 1].id;

							self.setVariable('input_channel', self.input_channel);
							self.setVariable('input_slot', self.inputSelect[Number(split_data[3])-1].label);
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
				var split_data = [];
				var str = data.substring(data.indexOf('LPH') + 3 );

				var x = 0;
				var y = 0;

				for (let i = 0; i < 4; i++) { 	// Striped down to: ' 001 002 003 004 "Some Message")'
					x = str.indexOf(' ') + 1; 		// Get first " "
					y = str.indexOf(' ', 1);			// Get seccond " "

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

			// Migth need some code to request current setup.
			// For now it should react to changes, but need someone to test to be sure.

			// Initial data from Christie
			if (oldHasData != self.has_data && self.has_data) {
				self.checkFeedbacks();
				self.update_variables();
			}

		})
	}
};


// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module controls Christie projectors,input selection will be added later since we need to fetch the input port information from the projector.'
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
			label: 'Target port (Default = 3002)',
			width: 6,
			default: '3002',
			regex: self.REGEX_PORT
		}
		/*
		TODO this will be used to limit / selct the options acording to the projector series in use, need to find a event to trigger the assignments
		{
			type: 'dropdown',
			label: 'projector type',
			id: 'pjtype',
			width: 6,
			choices: [
				{ label: 'Boxer series',              id: 'boxer' },
				{ label: 'M series',                     id: 'mseries' }
			]
		}
		*/
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
	}

	debug("destroy", self.id);
};

instance.prototype.OnOff = [
	{ label: 'OFF',			id: '0' },
	{ label: 'ON',			id: '1' },
];

instance.prototype.EnableDisable = [
	{ label: 'Disable',	id: '0' },
	{ label: 'Enable',	id: '1' },
];

instance.prototype.shutter = [
	{ label: 'Open',		id: '0' },
	{ label: 'Close',		id: '1' },
];

instance.prototype.colorProfile = [
	{ label: 'Max Drives (Default)',	id: '0' },
	{ label: 'Color Temperature',     id: '1' },
	{ label: 'SD Video',							id: '2' },
	{ label: 'HD Video',							id: '3' },
	{ label: 'User 1',								id: '4' },
	{ label: 'User 2',								id: '5' },
	{ label: 'User 3',								id: '6' },
	{ label: 'User 4',								id: '7' },
];

instance.prototype.colorName = [
	{ label: 'Red',           id: '1' },
	{ label: 'Green',         id: '2' },
	{ label: 'Blue',          id: '3' },
	{ label: 'Yellow',        id: '4' },
	{ label: 'Cyan',          id: '5' },
	{ label: 'Magenta',       id: '6' },
	{ label: 'White',         id: '7' },
	{ label: 'Black',         id: '8' }
];

instance.prototype.colorSpace = [
	{ label: 'RGB',           id: '0' },
	{ label: 'YPbPr (SDTV)',  id: '1' },
	{ label: 'YPbPr (HDTV)',  id: '2' },
];

instance.prototype.errorEnable = [
	{ label: 'Off',           					id: '0' },
	{ label: 'On-Screen display',				id: '1' },
	{ label: 'ASCII message',						id: '2' },
	{ label: 'Both',  									id: '3' },
	{ label: 'All except error 1E & F',	id: '4' },
];

instance.prototype.inputFilter = [
	{ label: 'Off',						id: '0' },
	{ label: 'HDTV',					id: '1' },
	{ label: 'SDTV',					id: '2' },
	{ label: 'EDTV',  				id: '3' },
	{ label: 'Graphics/RGB',	id: '4' },
];

instance.prototype.imageOpti = [
	{ label: 'Best Image Quality',	id: '0' },
	{ label: 'Smooth Switching',		id: '1' },
	{ label: 'Seamless Switching',	id: '2' },
];

instance.prototype.tpatBasic = [
	{ label: 'Off',                            id: '0' },
	{ label: 'Grid',                           id: '1' },
	{ label: 'Grey Scale 16',                  id: '2' },
	{ label: 'White',                          id: '3' },
	{ label: 'Flat Grey',                      id: '4' },
	{ label: 'Black',                          id: '5' },
	{ label: 'Checker',                        id: '6' },
	{ label: '13 Point',                       id: '7' },
	{ label: 'Color Bars',                     id: '8' },
	{ label: 'RGBW Gray Scale',                id: '9' },
	{ label: 'Multi Color',                    id: '10'},
	{ label: 'Edge Blend',                     id: '11'},
	{ label: 'Aspect Ratio',                   id: '12'},
	{ label: 'Red & Blue Ramp',                id: '13'},
	{ label: 'Calibration Line Ramp',          id: '14'},
	{ label: 'Calibration Black & White Grid', id: '15'},
	{ label: 'Calibration White & Red Grid',   id: '16'},
	{ label: 'Calibration White & Green Grid', id: '17'},
	{ label: 'Calibration White & Blue Grid',  id: '18'},
];

instance.prototype.tpatBoxer = [
	{ label: 'Off',              id: '0' },
	{ label: 'Grid',             id: '1' },
	{ label: 'Grey Scale 16',    id: '2' },
	{ label: 'Flat White',       id: '3' },
	{ label: 'Flat Grey',        id: '4' },
	{ label: 'Flat Black',       id: '5' },
	{ label: 'Checker',          id: '6' },
	{ label: '17 Point',         id: '7' },
	{ label: 'Edge Blend',       id: '8' },
	{ label: 'Color Bars',       id: '9' },
	{ label: 'Multi Color',      id: '10'},
	{ label: 'RGBW Ramp',        id: '11'},
	{ label: 'Horizontal Ramp',  id: '12'},
	{ label: 'Vertical Ramp',    id: '13'},
	{ label: 'Diagonal Ramp',    id: '14'},
	{ label: 'Square Grid',      id: '15'},
	{ label: 'Diagonal Grid',    id: '16'},
	{ label: 'Maximum Activity', id: '17'},
	{ label: 'Prism/Convergence',id: '18'},
	{ label: 'Boresight',        id: '21'},
	{ label: 'Convergence',      id: '22'},
	{ label: 'Integrator Rod',   id: '23'},
	{ label: 'Resolution Demo',  id: '25'}
];

instance.prototype.tpatMser = [
	{ label: 'Off',              id: '0' },
	{ label: 'Grid',             id: '1' },
	{ label: 'Grey Scale 16',    id: '2' },
	{ label: 'White',            id: '3' },
	{ label: 'Flat Grey',        id: '4' },
	{ label: 'Black',            id: '5' },
	{ label: 'Checker',          id: '6' },
	{ label: '13 Point',         id: '7' },
	{ label: 'Color Bars',       id: '8' },
	{ label: 'Aspect Ratio',     id: '11'},
	{ label: 'Edge Blend',       id: '12'},
	{ label: 'Boresight',        id: '14'}
];

instance.prototype.keypadEnableP1 = [
	{ label: 'Wired',						id: '0' },
	{ label: 'IR Front',				id: '1' },
	{ label: 'IR Back',					id: '2' },
];

instance.prototype.keypadEnableP2 = [
	{ label: 'Off',							id: '0' },
	{ label: 'Protocol Any',		id: '1' },
	{ label: 'Protocol A',	  	id: '10'},
	{ label: 'Protocol B',    	id: '11'},
	{ label: 'Protocol C',    	id: '12'},
	{ label: 'Protocol D',			id: '13'},
	{ label: 'Protocol E',			id: '14'},
	{ label: 'Protocol F',			id: '15'},
	{ label: 'Protocol G',			id: '16'},
];

instance.prototype.keyCode = [
	{ label: '0',								id: '0'  },
	{ label: '1',								id: '1'  },
	{ label: '2',								id: '2'  },
	{ label: '3',								id: '3'  },
	{ label: '4',								id: '4'  },
	{ label: '5',								id: '5'  },
	{ label: '6',								id: '6'  },
	{ label: '7',								id: '7'  },
	{ label: '8',								id: '8'  },
	{ label: '9',								id: '9'  },
	{ label: 'Shift',						id: '12' },
	{ label: 'Enter',						id: '13' },
	{ label: 'Func',						id: '14' },
	{ label: 'Proj',						id: '22' },
	{ label: 'Exit',						id: '27' },
	{ label: 'Cont',						id: '41' },
	{ label: 'Menu',						id: '44' },
	{ label: 'Power',						id: '46' },
	{ label: 'OSD',							id: '47' },
	{ label: 'Up (On)',					id: '58' },
	{ label: 'Down (Off)',			id: '59' },
	{ label: 'Left (-)',				id: '60' },
	{ label: 'Lamp',						id: '61' },
	{ label: 'Right (+)',				id: '62' },
	{ label: 'Help',						id: '63' },
	{ label: 'Input',						id: '64' },
	{ label: 'Input 1 / BNC',		id: '65' },
	{ label: 'Input 2 / DVI',		id: '66' },
	{ label: 'Input 3 / VID',		id: '67' },
	{ label: 'Input 4 / S-Vid',	id: '68' },
	{ label: 'Input 5 / Opt-1',	id: '69' },
	{ label: 'Input 6 / Opt-2',	id: '70' },
	{ label: 'Zoom IN',					id: '71' },
	{ label: 'Zoom Out',				id: '72' },
	{ label: 'Focus IN',				id: '73' },
	{ label: 'Focus Out',				id: '74' },
	{ label: 'Lens H Right',		id: '75' },
	{ label: 'Lens H Left',			id: '76' },
	{ label: 'Lens V Up',				id: '77' },
	{ label: 'Lens V Down',			id: '78' },
	{ label: 'Bright',					id: '80' },
	{ label: 'Channel',					id: '81' },
	{ label: 'Test',						id: '82' },
	{ label: 'Shutter',					id: '83' },
	{ label: 'PIP',							id: '84' },
	{ label: 'Gamma',						id: '85' },
	{ label: 'Auto',						id: '86' },
	{ label: 'Focus',						id: '87' },
	{ label: 'Zoom',						id: '88' },
	{ label: 'Swap',						id: '89' },
];

instance.prototype.lensCal = [
	{ label: 'Relative',				id: '0' },
	{ label: 'Manual',					id: '1' },
	{ label: 'Calibrate',				id: '2' },
];

instance.prototype.language = [
	{ label: 'English',    			id: '1' },
	{ label: 'French',     			id: '2' },
	{ label: 'Spanish',    			id: '3' },
	{ label: 'German',     			id: '4' },
	{ label: 'Italian',    			id: '5' },
];

instance.prototype.lampOp = [
	{ label: 'Lamp 1 only',			id: '1' },
	{ label: 'Lamp 2 only',			id: '2' },
	{ label: 'Both',						id: '3' },
];

instance.prototype.lampMode = [
	{ label: 'max brightness',							id: '0' },
	{ label: 'maintain intensity setting',	id: '1' },
	{ label: 'maintain power setting',			id: '2' },
];

instance.prototype.lampMode = [
	{ label: 'Auto',						id: '0' },
	{ label: 'Still',						id: '1' },
	{ label: 'Motion',					id: '2' },
	{ label: 'Film',						id: '3' },
];

instance.prototype.pipPreset = [
	{ label: 'Top Left',    		id: '0' },
	{ label: 'Top Right',     	id: '1' },
	{ label: 'Bottom Left',    	id: '2' },
	{ label: 'Bottom Right',    id: '3' },
	{ label: 'Custom',    			id: '4' },
];

instance.prototype.inputSelect = [
	{ label: 'BNC',    					id: '1' },
	{ label: 'DVI-I',     			id: '2' },
	{ label: 'Composite',    		id: '3' },
	{ label: 'S-Video',    			id: '4' },
	{ label: 'Option slot #1',  id: '5' },
	{ label: 'Option slot #2',  id: '6' },
	{ label: 'Option slot #3',  id: '7' },
	{ label: 'Option slot #4',  id: '8' },
];

instance.prototype.selectOri = [
	{ label: 'Front Projection',        	id: '0' },
	{ label: 'Rear Projection',    				id: '1' },
	{ label: 'Front Projection Inverted', id: '2' },
	{ label: 'Rear Projection Inverted',	id: '3' },
];

instance.prototype.videoStandard = [
	{ label: 'PAL',        			id: '0' },
	{ label: 'NTSC',    				id: '1' },
	{ label: 'SECAM', 					id: '2' },
	{ label: 'NTSC4.43',				id: '3' },
	{ label: 'PAL-M',        		id: '4' },
	{ label: 'PAL-NC',    			id: '5' },
	{ label: 'PAL-60', 					id: '6' },
	{ label: 'NTSC',						id: '7' },
	{ label: 'Auto-select',			id: '8' },
];

instance.prototype.size = [
	{ label: 'Default',        	id: '0' },
	{ label: 'No Resizing',    	id: '1' },
	{ label: 'Full Screen', 		id: '2' },
	{ label: 'Full Width',			id: '3' },
	{ label: 'Full Height',     id: '4' },
	{ label: 'Anamorphic',    	id: '5' },
	{ label: 'Custom resizing',	id: '6' },
];

instance.prototype.warpSelBasic = [
	{ label: 'Off',        			id: '0' },
	{ label: '2D Warp',    			id: '1' },
	{ label: 'User 1',     			id: '2' },
	{ label: 'User 2',     			id: '3' },
	{ label: 'User 3',     			id: '4' },
];

instance.prototype.warpSelMseries = [
	{ label: 'Off',                              id: '0' },
	{ label: 'Mseries 2D Warp, Boxer User 1',    id: '1' },
	{ label: 'Mseries User 1, Boxer User 2',     id: '2' },
	{ label: 'Mseries User 2, Boxer User 3',     id: '3' },
	{ label: 'Mseries User 3, Boxer User 4',     id: '4' },
	{ label: 'Mseries User 4',                   id: '5' },
	{ label: 'Mseries User 5',                   id: '6' },
	{ label: 'Mseries User 6',                   id: '7' },
	{ label: 'Mseries User 7',                   id: '8' },
	{ label: 'Mseries User 8',                   id: '9' },
	{ label: 'Mseries User 9',                   id: '10' },
	{ label: 'Mseries User 10, Boxer Keystone',  id: '11' },
	{ label: 'Mseries User 11',                  id: '12' },
	{ label: 'Mseries User 12',                  id: '13' },
	{ label: 'Mseries User 13',                  id: '14' },
	{ label: 'Mseries User 14',                  id: '15' },
	{ label: 'Mseries User 15',                  id: '16' },
	{ label: 'Mseries User 16',                  id: '17' }
];

instance.prototype.init_presets = function () {
	var self = this;
	var presets = [];
	var pstSize = '18';

	// ###################### Auto Source ######################

	// Auto Source ON / OFF
	for (var input = 0; input < 50; input++) {
		for (var input2 in self.OnOff) {
			presets.push({
				category: 'Auto Source',
				label: ' Auto Source ' + (input+1) + ' ' + self.OnOff[input2].label,
				bank: {
					style: 'text',
					text: 'ASR CH ' + (input+1) + ' ' + self.OnOff[input2].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'asr',
						options: {
							p1: (input+1),
							p2: self.OnOff[input2].id
						}
					}
				],
			});
		}
	}

	// ###################### Brightness ######################

	// Brightness Set 0-100%
	for (var input = 0; input < 11; input++) {
		presets.push({
			category: 'Brightness',
			label: 'Brightness Set ' + (input*10) + '%',
			bank: {
				style: 'text',
				text: 'Bright ' + (input*10) + '%',
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'brt',
					options: {
						p1: (input*100),
					}
				}
			],
		});
	}

	// ###################### Constrast ######################

	// Contrast Set 0-100%
	for (var input = 0; input < 11; input++) {
		presets.push({
			category: 'Contrast',
			label: 'Contrast Set ' + (input*10) + '%',
			bank: {
				style: 'text',
				text: 'Cont. ' + (input*10) + '%',
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'con',
					options: {
						p1: (input*100),
					}
				}
			],
		});
	}

	// ###################### Color ######################

	// Color Set 0-100%
	for (var input = 0; input < 11; input++) {
		presets.push({
			category: 'Color',
			label: 'Color Set ' + (input*10) + '%',
			bank: {
				style: 'text',
				text: 'Color ' + (input*10) + '%',
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'clr',
					options: {
						p1: (input*100),
					}
				}
			],
		});
	}

	// ###################### Tint ######################

	// Tint Set 0-100%
	for (var input = 0; input < 11; input++) {
		presets.push({
			category: 'Tint',
			label: 'Tint Set ' + (input*10) + '%',
			bank: {
				style: 'text',
				text: 'Tint ' + (input*10) + '%',
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'tnt',
					options: {
						p1: (input*100),
					}
				}
			],
		});
	}

	// ###################### Gamma ######################

	// Gamma Set 100-280 = 1.8-2.0
	for (var input = 0; input < 19; input++) {
		presets.push({
			category: 'Gamma',
			label: 'Gamma Set ' + (input*10+100),
			bank: {
				style: 'text',
				text: 'Gamma ' + (input*10+100),
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'gam',
					options: {
						p1: (input*10+100),
					}
				}
			],
		});
	}

	// ###################### Motion Filter ######################

	// Motion Filter
	for (var input in self.motionFilter) {
		presets.push({
			category: 'Motion Filter',
			label: 'Motion Filter ' + self.motionFilter[input].label,
			bank: {
				style: 'text',
				text: 'Motion ' + self.motionFilter[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'mot',
					options: {
						p1: self.motionFilter[input].id
					}
				}
			],
		});
	}

	// ###################### Picture / Image ######################

	// Aspect Ratio Overlay ON / OFF
	for (var input in self.OnOff) {
		presets.push({
			category: 'Image',
			label: 'Aspect Ratio Overlay ' + self.OnOff[input].label,
			bank: {
				style: 'text',
				text: 'ARO ' + self.OnOff[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'aro',
					options: {
						p1: self.OnOff[input].id
					}
				}
			],
		});
	}

	// Freeze Image ON / OFF
	for (var input in self.OnOff) {
		presets.push({
			category: 'Image',
			label: 'Freeze Image ' + self.OnOff[input].label,
			bank: {
				style: 'text',
				text: 'Freeze ' + self.OnOff[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'frz',
					options: {
						p1: self.OnOff[input].id
					}
				}
			],
		});
	}

	// Select Color Output / Profile
	for (var input in self.colorProfile) {
		presets.push({
			category: 'Image',
			label: 'Select Color Output/Profile ' + self.colorProfile[input].label,
			bank: {
				style: 'text',
				text: 'Color Prof. ' + self.colorProfile[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'ccs',
					options: {
						p1: self.colorProfile[input].id
					}
				}
			],
		});
	}

	// Color Space
	for (var input in self.colorSpace) {
		presets.push({
			category: 'Image',
			label: 'Color Space ' + self.colorSpace[input].label,
			bank: {
				style: 'text',
				text: 'Color Space ' + self.colorSpace[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'csp',
					options: {
						p1: self.colorSpace[input].id
					}
				}
			],
		});
	}

	// Color Enable
	for (var input in self.colorName) {
		presets.push({
			category: 'Image',
			label: 'Color Enable ' + self.colorName[input].label,
			bank: {
				style: 'text',
				text: 'Color En. ' + self.colorName[input].label,
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'cle',
					options: {
						p1: self.colorName[input].id
					}
				}
			],
		});
	}

	// Input Filter
	for (var input in self.inputFilter) {
		presets.push({
			category: 'Image',
			label: 'Input Filter ' + self.inputFilter[input].label,
			bank: {
				style: 'text',
				text: 'Filter ' + self.inputFilter[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'fil',
					options: {
						p1: self.inputFilter[input].id
					}
				}
			],
		});
	}

	// Image Optimazation
	for (var input in self.imageOpti) {
		presets.push({
			category: 'Image',
			label: 'Image Optimazation ' + self.imageOpti[input].label,
			bank: {
				style: 'text',
				text: 'Image Op. ' + self.imageOpti[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'iop',
					options: {
						p1: self.imageOpti[input].id
					}
				}
			],
		});
	}

	// ###################### Position ######################

	// Horizontal Position
	presets.push({
		category: 'Position',
		label: 'Horizontal Position: 500',
		bank: {
			style: 'text',
			text: 'Hori. Pos 500',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [
			{
				action: 'hor',
				options: {
					p1: '500'
				}
			}
		],
	});

	// Vertical Position
	presets.push({
		category: 'Position',
		label: 'Vertical Position: 500',
		bank: {
			style: 'text',
			text: 'Vert. Pos 500',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [
			{
				action: 'vrt',
				options: {
					p1: '500'
				}
			}
		],
	});

	// Screen Orientation
	for (var input in self.selectOri) {
		presets.push({
			category: 'Position',
			label: 'Screen Orientation ' + self.selectOri[input].label,
			bank: {
				style: 'text',
				text: 'Orient. ' + self.selectOri[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'sor',
					options: {
						p1: self.selectOri[input].id
					}
				}
			],
		});
	}

	// Screen Size Preset
	for (var input in self.size) {
		presets.push({
			category: 'Position',
			label: 'Screen Size Preset ' + self.size[input].label,
			bank: {
				style: 'text',
				text: 'Size Preset ' + self.size[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'szp',
					options: {
						p1: self.size[input].id
					}
				}
			],
		});
	}

	// ###################### Warp Select (Basic) ######################

	// Warp Select (Basic)
	for (var input in self.warpSelBasic) {
		presets.push({
			category: 'Warp Select (Basic)',
			label: 'Warp Select (Basic) ' + self.warpSelBasic[input].label,
			bank: {
				style: 'text',
				text: 'Warp Basic: ' + self.warpSelBasic[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'wps',
					options: {
						p1: self.warpSelBasic[input].id
					}
				}
			],
		});
	}

	// ###################### Warp Select (M-series/Boxer) ######################

	// Warp Select (M-series/Boxer)
	for (var input in self.warpSelMseries) {
		presets.push({
			category: 'Warp Select (M-Serise)',
			label: 'Warp Select (M-series/Boxer) ' + self.warpSelMseries[input].label,
			bank: {
				style: 'text',
				text: 'Warp Mser: ' + self.warpSelMseries[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'wrp',
					options: {
						p1: self.warpSelMseries[input].id
					}
				}
			],
		});
	}

	// ###################### Lens ######################

	// Automatic Lens Calibration ON / OFF
	for (var input in self.OnOff) {
		presets.push({
			category: 'Lens',
			label: 'Automatic Lens Calibration ' + self.OnOff[input].label,
			bank: {
				style: 'text',
				text: 'Lamp Auto Cali. ' + self.OnOff[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'alc',
					options: {
						p1: self.OnOff[input].id
					}
				}
			],
		});
	}

	// Lens Calibrate
	for (var input in self.lensCal) {
		presets.push({
			category: 'Lens',
			label: 'Lens Calibrate ' + self.lensCal[input].label,
			bank: {
				style: 'text',
				text: 'Lamp Cali. ' + self.lensCal[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'lcb',
					options: {
						p1: self.lensCal[input].id
					}
				}
			],
		});
	}

	// Lens Center
	presets.push({
		category: 'Lens',
		label: 'Lens Center',
		bank: {
			style: 'text',
			text: 'Lens Center',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [
			{
				action: 'lcn'
			}
		],
	});

	// Intelligent Lens System ON / OFF
	for (var input in self.OnOff) {
		presets.push({
			category: 'Lens',
			label: 'Intelligent Lens System ' + self.OnOff[input].label,
			bank: {
				style: 'text',
				text: 'ILS ' + self.OnOff[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'ils',
					options: {
						p1: self.OnOff[input].id
					}
				}
			],
		});
	}

	// Zoom
	presets.push({
		category: 'Lens',
		label: 'Zoom',
		bank: {
			style: 'text',
			text: 'Zoom 5000',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [
			{
				action: 'zom',
				options: {
					p1: '3000'
				}
			}
		],
	});

	// Focus
	presets.push({
		category: 'Lens',
		label: 'Focus',
		bank: {
			style: 'text',
			text: 'Focus 4000',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [
			{
				action: 'fcs',
				options: {
					p1: '4000'
				}
			}
		],
	});

	// ###################### Lamp ######################

	// Get Lamp ON Time
	presets.push({
		category: 'Lamp',
		label: 'Get Lamp ON Time',
		bank: {
			style: 'text',
			text: 'Get Lamp Time',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [
			{
				action: 'lph'
			}
		],
	});

	// Lamp Conditioning ON / OFF
	for (var input in self.OnOff) {
		presets.push({
			category: 'Lamp',
			label: 'Lamp Conditioning ' + self.OnOff[input].label,
			bank: {
				style: 'text',
				text: 'Lamp Con ' + self.OnOff[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'lco',
					options: {
						p1: self.OnOff[input].id
					}
				}
			],
		});
	}

	// Lamp Operation
	for (var input in self.lampOp) {
		presets.push({
			category: 'Lamp',
			label: 'Lamp Operation ' + self.lampOp[input].label,
			bank: {
				style: 'text',
				text: 'Lamp Op ' + self.lampOp[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'lop',
					options: {
						p1: self.lampOp[input].id
					}
				}
			],
		});
	}

	// Lamp Mode
	for (var input in self.lampMode) {
		presets.push({
			category: 'Lamp',
			label: 'Lamp Mode ' + self.lampMode[input].label,
			bank: {
				style: 'text',
				text: 'Lamp Mode ' + self.lampMode[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'lpm',
					options: {
						p1: self.lampMode[input].id
					}
				}
			],
		});
	}

	// Lamp Intensity
	presets.push({
		category: 'Lamp',
		label: 'Lamp Intensity',
		bank: {
			style: 'text',
			text: 'Lamp Intencity 100',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [
			{
				action: 'lpi',
				options: {
					p1: '100'
				}
			}
		],
	});

	// Lamp Changed
	presets.push({
		category: 'Lamp',
		label: 'Lamp Changed',
		bank: {
			style: 'text',
			text: 'Lamp Changed',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [
			{
				action: 'lpc',
				options: {
					p1: ''
				}
			}
		],
	});

	// ###################### Input Channel ######################

	// Set Input Channel
	for (let i = 0; i < 50; i++) {
		presets.push({
			category: 'Select Channel',
			label: 'CH ' + (i+1),
			bank: {
				style: 'text',
				text: 'CH ' + (i+1),
				size: 'auto',
				color: '16777215',
				bgcolor: 0
			},
			actions: [{
				action: 'cha',
				options: {
					p1: (i+1),
				}
			}],
			feedbacks: [
				{
					type: 'input_channel',
					options: {
						fg1: self.rgb(255, 255, 255),
						bg1: self.rgb(255, 0, 0),
						input: (i+1)
					}
				}
			]
		});

	}

	// ###################### Input Slot ######################

	// Set Input Slot
	for (var input in self.inputSelect) {
		presets.push({
			category: 'Input Slot',
			label: 'Slot ' + self.inputSelect[input].label,
			bank: {
				style: 'text',
				text: 'Slot ' + self.inputSelect[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: 0
			},
			actions: [{
				action: 'sin',
				options: {
					p1: self.inputSelect[input].label,
				}
			}],
			feedbacks: [
				{
					type: 'input_slot',
					options: {
						fg1: self.rgb(255, 255, 255),
						bg1: self.rgb(255, 0, 0),
						input: self.inputSelect[input].id
					}
				}
			]
		});

	}

	// ###################### Internal Test Pattern (General/Basic) ######################

	// Internal Test Pattern (General/Basic)
	for (var input in self.tpatBasic) {
		presets.push({
			category: 'Test Pattern (Basic)',
			label: 'Internal Test Pattern (General/Basic) ' + self.tpatBasic[input].label,
			bank: {
				style: 'text',
				text: 'ITP ' + self.tpatBasic[input].label,
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [{
				action: 'itpBasic',
				options: {
					p1: self.tpatBasic[input].label,
				}
			}]
		});
	}

	// ###################### Internal Test Pattern (Boxer) ######################

	// Internal Test Pattern (Boxer)
	for (var input in self.tpatBoxer) {
		presets.push({
			category: 'Test Pattern (Boxer)',
			label: 'Internal Test Pattern (Boxer) ' + self.tpatBoxer[input].label,
			bank: {
				style: 'text',
				text: 'ITP ' + self.tpatBoxer[input].label,
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [{
				action: 'itpBoxer',
				options: {
					p1: self.tpatBoxer[input].label,
				}
			}]
		});
	}

	// ###################### Internal Test Pattern (M-Series) ######################

	// Internal Test Pattern (Boxer)
	for (var input in self.tpatMser) {
		presets.push({
			category: 'Test Pattern (M-Series)',
			label: 'Internal Test Pattern (M-Series) ' + self.tpatMser[input].label,
			bank: {
				style: 'text',
				text: 'ITP ' + self.tpatMser[input].label,
				size: '14',
				color: '16777215',
				bgcolor: 0
			},
			actions: [{
				action: 'itpMser',
				options: {
					p1: self.tpatMser[input].label,
				}
			}]
		});
	}

	// ###################### Picture-In-Picture ######################

	// PIP ON / OFF
	for (var input in self.OnOff) {
		presets.push({
			category: 'PIP',
			label: 'Picture In Picture ' + self.OnOff[input].label,
			bank: {
				style: 'text',
				text: 'PIP ' + self.OnOff[input].label + ' $(ChristieProPj:pip_enabled)',
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'pip',
					options: {
						p1: self.OnOff[input].id
					}
				}
			],
			feedbacks: [
				{
					type: 'pip_enabled',
					options: {
						fg1: self.rgb(255, 255, 255),
						bg1: self.rgb(255, 0, 0),
						bg2: self.rgb(0, 204, 0),
					}
				}
			]
		});
	}

	// PIP Swap
	presets.push({
		category: 'PIP',
		label: 'Picture In Picture Swap',
		bank: {
			style: 'text',
			text: 'PIP Swap',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [
			{
				action: 'pps',
			}
		],
	});

	// PIP Preset
	for (var input in self.pipPreset) {
		presets.push({
			category: 'PIP',
			label: 'Picture In Picture Preset' + self.pipPreset[input].label,
			bank: {
				style: 'text',
				text: 'PIP ' + self.pipPreset[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'ppp',
					options: {
						p1: self.pipPreset[input].id
					}
				}
			],
		});
	}

	// ###################### Key Pad ######################

	// Keypad Enable
	for (var input in self.keypadEnableP1) {
		for (var input2 in self.keypadEnableP2) {
			presets.push({
				category: 'Keypad ' + self.keypadEnableP1[input].label,
				label: self.keypadEnableP1[input].label + ' ' + self.keypadEnableP2[input2].label,
				bank: {
					style: 'text',
					text: self.keypadEnableP1[input].label + ' ' + self.keypadEnableP2[input2].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'ken',
						options: {
							p1: self.keypadEnableP1[input].id,
							p2: self.keypadEnableP2[input2].id
						}
					}
				],
			});
		}
	}

	// ###################### Key Codes ######################

	// Key Code
	for (var input in self.keyCode) {
		presets.push({
			category: 'Key Codes',
			label: 'Key Code:' + self.keyCode[input].label,
			bank: {
				style: 'text',
				text: 'KEY: ' + self.keyCode[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'key',
					options: {
						p1: self.keyCode[input].id
					}
				}
			],
		});
	}

	// ###################### Language ######################

	// Set Language
	for (var input in self.language) {
		presets.push({
			category: 'Language',
			label: 'Set Language:' + self.language[input].label,
			bank: {
				style: 'text',
				text: 'LNG: ' + self.language[input].label,
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'lng',
					options: {
						p1: self.language[input].id
					}
				}
			],
		});
	}

	// ###################### Commands ######################

		// Auto Setup
		presets.push({
			category: 'Commands',
			label: 'Auto Setup',
			bank: {
				style: 'text',
				text: 'Auto Setup',
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'asu',
				}
			],
		});

	// Auto Power Up ON / OFF
	for (var input in self.OnOff) {
		presets.push({
			category: 'Commands',
			label: 'Auto Power Up ' + self.OnOff[input].label,
			bank: {
				style: 'text',
				text: 'Auto PWR ' + self.OnOff[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'apw',
					options: {
						p1: self.OnOff[input].id
					}
				}
			],
		});
	}

	// Power ON / OFF
	for (var input in self.OnOff) {
		presets.push({
			category: 'Commands',
			label: 'Power ' + self.OnOff[input].label,
			bank: {
				style: 'text',
				text: 'PWR ' + self.OnOff[input].label +' $(ChristieProPj:power_state)',
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'pwr',
					options: {
						p1: self.OnOff[input].id
					}
				}
			],
			feedbacks: [
				{
					type: 'power_state',
					options: {
						fg1: self.rgb(255, 255, 255),
						fg2: self.rgb(0, 0, 0),
						bg1: self.rgb(0, 204, 0),
						bg2: self.rgb(255, 0, 0),
						bg3: self.rgb(255, 255, 0),
						bg4: self.rgb(255, 255, 0),
						bg5: self.rgb(255, 255, 0),
					}
				}
			]
		});
	}

	// Shutter Open / Close
	for (var input in self.shutter) {
		presets.push({
			category: 'Commands',
			label: 'Shutter ' + self.shutter[input].label,
			bank: {
				style: 'text',
				text: 'Shutter ' + self.shutter[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'shu',
					options: {
						p1: self.shutter[input].id
					}
				}
			],
			feedbacks: [
				{
					type: 'shutter_closed',
					options: {
						fg1: self.rgb(255, 255, 255),
						bg1: self.rgb(255, 0, 0),
						bg2: self.rgb(0, 204, 0),
					}
				}
			]
		});
	}

	// OSD ON / OFF
	for (var input in self.OnOff) {
		presets.push({
			category: 'Commands',
			label: 'On Screen Display ' + self.OnOff[input].label,
			bank: {
				style: 'text',
				text: 'OSD ' + self.OnOff[input].label + ' $(ChristieProPj:osd_enabled)',
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'osd',
					options: {
						p1: self.OnOff[input].id
					}
				}
			],
			feedbacks: [
				{
					type: 'osd_enabled',
					options: {
						fg1: self.rgb(255, 255, 255),
						bg1: self.rgb(255, 0, 0),
						bg2: self.rgb(0, 204, 0),
					}
				}
			]
		});
	}

	// Source Dialog Enable ON / OFF
	for (var input in self.OnOff) {
		presets.push({
			category: 'Commands',
			label: 'Source Dialog Enable ' + self.OnOff[input].label,
			bank: {
				style: 'text',
				text: 'Source Dia En. ' + self.OnOff[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'sde',
					options: {
						p1: self.OnOff[input].id
					}
				}
			],
		});
	}

	// Error Message Enable
	for (var input in self.errorEnable) {
		presets.push({
			category: 'Commands',
			label: 'Error Message Enable ' + self.errorEnable[input].label,
			bank: {
				style: 'text',
				text: 'ERR MSG: ' + self.errorEnable[input].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'eme',
					options: {
						p1: self.errorEnable[input].id
					}
				}
			],
		});
	}

	// Get Lamp ON Time
	presets.push({
		category: 'Commands',
		label: 'Get Lamp ON Time',
		bank: {
			style: 'text',
			text: 'Get Lamp Time',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [
			{
				action: 'lph'
			}
		],
	});

	// Factory Defaults
	presets.push({
		category: 'Commands',
		label: 'Factory Defaults',
		bank: {
			style: 'text',
			text: 'Factory Reset',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [
			{
				action: 'def',
				options: {
					p1: '111'
				}
			}
		],
	});

	// ###################### Status ######################

	// Power State
	presets.push({
		category: 'Status',
		label: 'Show Power State',
		bank: {
			style: 'text',
			text: 'PWR: $(ChristieProPj:power_state)',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		feedbacks: [
			{
				type: 'power_state',
				options: {
					fg1: self.rgb(255, 255, 255),
					fg2: self.rgb(0, 0, 0),
					bg1: self.rgb(0, 204, 0),
					bg2: self.rgb(255, 0, 0),
					bg3: self.rgb(255, 255, 0),
					bg4: self.rgb(255, 255, 0),
					bg5: self.rgb(255, 255, 0),
				}
			}
		]
	});

	// Standby State
	presets.push({
		category: 'Status',
		label: 'Show Standby State',
		bank: {
			style: 'text',
			text: 'STB: $(ChristieProPj:standby)',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		feedbacks: [
			{
				type: 'standby_state',
				options: {
					fg1: self.rgb(255, 255, 255),
					bg1: self.rgb(255, 0, 0),
					bg2: self.rgb(0, 204, 0),
				}
			}
		]
	});

	// Signal present
	presets.push({
		category: 'Status',
		label: 'Show Signal Status',
		bank: {
			style: 'text',
			text: 'Signal: $(ChristiePj:signal_state)',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		feedbacks: [
			{
				type: 'signal_state',
				options: {
					fg1: self.rgb(255, 255, 255),
					fg2: self.rgb(0, 0, 0),
					bg1: self.rgb(0, 204, 0),
					bg2: self.rgb(255, 0, 0),
					bg3: self.rgb(255, 255, 0),
				}
			}
		]
	});

	// Shutter State
	presets.push({
		category: 'Status',
		label: 'Show Shutter Status',
		bank: {
			style: 'text',
			text: 'Shutter: $(ChristiePj:shutter_closed)',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		feedbacks: [
			{
				type: 'shutter_closed',
				options: {
					fg1: self.rgb(255, 255, 255),
					bg1: self.rgb(255, 0, 0),
					bg2: self.rgb(0, 204, 0),
				}
			}
		]
	});

	// OSD State
	presets.push({
		category: 'Status',
		label: 'Show On Screen Display Status',
		bank: {
			style: 'text',
			text: 'OSD: $(ChristiePj:osd_state)',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		feedbacks: [
			{
				type: 'osd_enabled',
				options: {
					fg1: self.rgb(255, 255, 255),
					bg1: self.rgb(255, 0, 0),
					bg2: self.rgb(0, 204, 0),
				}
			}
		]
	});

	// PIP State
	presets.push({
		category: 'Status',
		label: 'Show Picture In Picture Status',
		bank: {
			style: 'text',
			text: 'PIP: $(ChristiePj:osd_state)',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		feedbacks: [
			{
				type: 'pip_state',
				options: {
					fg1: self.rgb(255, 255, 255),
					bg1: self.rgb(255, 0, 0),
					bg2: self.rgb(0, 204, 0),
				}
			}
		]
	});

	// Input Channel
	presets.push({
		category: 'Status',
		label: 'Show Input Channel',
		bank: {
			style: 'text',
			text: 'CH: $(ChristiePj:input_channel)',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
	});

	// Input Slot
	presets.push({
		category: 'Status',
		label: 'Show Input Slot',
		bank: {
			style: 'text',
			text: 'Slot: $(ChristiePj:input_slot)',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
	});

	// Lamp 1 ON Time
	presets.push({
		category: 'Status',
		label: 'Show Lamp 1 ON Time',
		bank: {
			style: 'text',
			text: 'Lamp 1: $(ChristiePj:lamp_1)',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [
			{
				action: 'lph'
			}
		],
	});

	// Lamp 2 ON Time
	presets.push({
		category: 'Status',
		label: 'Show Lamp 2 ON Time',
		bank: {
			style: 'text',
			text: 'Lamp 2: $(ChristiePj:lamp_2)',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [
			{
				action: 'lph'
			}
		],
	});

	self.setPresetDefinitions(presets);
};

instance.prototype.actions = function(system) {
	var self = this;

	self.system.emit('instance_actions', self.id, {
		'alc': {
			label: 'Automatic Lens Calibration On / Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '0',
					choices: self.OnOff
				}
			]
		},
		'apw': {
			label: 'Auto Power Up On / Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '0',
					choices: self.OnOff
				}
			]
		},
		'aro': {
			label: 'Aspect Ratio Overlay / Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '0',
					choices: self.OnOff
				}
			]
		},
		'asr': {
			label: 'Auto Source On / Off',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Source Setup (1-50)',
					min: 1,
					max: 50,
					default: 1,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				},
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p2',
					default: '0',
					choices: self.OnOff
				}
			]
		},
		'asu':  {
			label: 'Auto Setup'
		},
		'brt': {
			label: 'Brightness',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Brightness (0-1000 = 0%-100%, 505 = 50.5%)',
					min: 0,
					max: 1000,
					default: 1,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				},
			]
		},
		'ccs':  {
			label: 'Select Output Color',
			options: [
				{
					type: 'dropdown',
					label: 'Select Color Profile',
					id: 'p1',
					default: '0',
					choices: self.colorProfile
				}
			]
		},
		'cha': {
			label: 'Channel Select',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Channel Number (1-50)',
					min: 1,
					max: 50,
					default: 1,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				},
			]
		},
		'cle':  {
			label: 'Color Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Select Color',
					id: 'p1',
					default: '8',
					choices: self.colorName
				}
			]
		},
		'clr': {
			label: 'Color Intensity',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Intensity (0-1000 = 0%-100%, 505 = 50.5%)',
					min: 0,
					max: 1000,
					default: 1,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				},
			]
		},
		'con': {
			label: 'Contrast',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Contrast (0-1000 = 0%-100%, 505 = 50.5%)',
					min: 0,
					max: 1000,
					default: 1,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				},
			]
		},
		'csp':  {
			label: 'Color Space',
			options: [
				{
					type: 'dropdown',
					label: 'Select Color Space',
					id: 'p1',
					default: '0',
					choices: self.colorSpace
				}
			]
		},
		'def': {
			label: 'Factory Defaults',
			options: [
				{
					type: 'dropdown',
					label: 'Are you sure?',
					id: 'p1',
					default: '',
					choices: [
						{ id: '', label: 'No' },
						{ id: '111', label: 'Yes' }
				]
				}
			]
		},
		'eme':  {
			label: 'Error Message Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Select an Option',
					id: 'p1',
					default: '3',
					choices: self.errorEnable
				}
			]
		},
		'fcs': {
			label: 'Focus (Fixed)',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Focus Set (0-9999)',
					min: 0,
					max: 9999,
					default: 4000,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				},
			]
		},
		'fil':  {
			label: 'Input Filter',
			options: [
				{
					type: 'dropdown',
					label: 'Select Filter Type',
					id: 'p1',
					default: '0',
					choices: self.inputFilter
				}
			]
		},
		'frz': {
			label: 'Freeze On / Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '0',
					choices: self.OnOff
				}
			]
		},
		'gam': {
			label: 'Gamma',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Gamma Set (100-280)',
					min: 100,
					max: 280,
					default: 220,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				},
			]
		},
		'hor': {
			label: 'Horizontal Position',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Horizontal Position',
					min: 0,
					max: 9999,
					default: 500,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				},
			]
		},
		'ils': {
			label: 'Intelligent Lens System On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '1',
					choices: self.OnOff
				}
			]
		},
		'iop':  {
			label: 'Image Optimization',
			options: [
				{
					type: 'dropdown',
					label: 'Select an Option',
					id: 'p1',
					default: '1',
					choices: self.imageOpti
				}
			]
		},
		'itpBasic': {
			label: 'Internal testpattern Basic collection (general use)',
			options: [
				{
					type: 'text',
					id: 'info',
					width: 12,
					label: 'Information',
					value: 'These options might change between models'
				},
				{
					type: 'dropdown',
					label: 'Select Testpattern',
					id: 'p1',
					default: '1',
					choices: self.tpatBoxer
				}
			]
		},
		'itpBoxer': {
			label: 'Internal testpattern Boxer series',
			options: [
				{
					type: 'text',
					id: 'info',
					width: 12,
					label: 'Information',
					value: 'These options might change between models'
				},
				{
					type: 'dropdown',
					label: 'Select Testpattern',
					id: 'p1',
					default: '1',
					choices: self.tpatBoxer
				}
			]
		},
		'itpMser': {
			label: 'Internal testpattern M series',
			options: [
				{
					type: 'text',
					id: 'info',
					width: 12,
					label: 'Information',
					value: 'These options might change between models'
				},
				{
					type: 'dropdown',
					label: 'Select Testpattern',
					id: 'p1',
					default: '1',
					choices: self.tpatMser
				}
			]
		},
		'ken':  {
			label: 'Keypad Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Select type',
					id: 'p1',
					default: '0',
					choices: self.keypadEnableP1
				},
				{
					type: 'dropdown',
					label: 'Protocol',
					id: 'p2',
					default: '0',
					choices: self.keypadEnableP2
				}
			]
		},
		'key':  {
			label: 'Key Code / Key Press',
			options: [
				{
					type: 'dropdown',
					label: 'Select Key',
					id: 'p1',
					default: '0',
					choices: self.keyCode
				}
			]
		},
		'lcb':  {
			label: 'Lens Calibrate',
			options: [
				{
					type: 'dropdown',
					label: 'Select type',
					id: 'p1',
					default: '0',
					choices: self.lensCal
				}
			]
		},
		'lcn':  {
			label: 'Lens Center'
		},
		'lco': {
			label: 'Lamp Conditioning On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '1',
					choices: self.OnOff
				}
			]
		},
		'lng':  {
			label: 'Language',
			options: [
				{
					type: 'dropdown',
					label: 'Select Language',
					id: 'p1',
					default: '1',
					choices: self.language
				}
			]
		},
		'lop':  {
			label: 'Lamp Operation',
			options: [
				{
					type: 'dropdown',
					label: 'Select Mode',
					id: 'p1',
					default: '3',
					choices: self.lampOp
				}
			]
		},
		'lpc':  {
			label: 'Lamp Changed',
			options: [
				{
					type: 'textinput',
					label: 'Serial nr: (Max 8 Charactors)',
					id: 'p1',
					default: '',
					required: true,
					regex: '/^.{1,8}$/' // limit to min 1 and max 8 charactors
				}
			]
		},
		'lph':  {
			label: 'Lamp Hours Of Use?',
		},
		'lpi':  {
			label: 'Lamp Intensity',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Setpoint (0-9999)',
					min: 0,
					max: 9999,
					default: 100,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				},
			]
		},
		'lpm':  {
			label: 'Lamp Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Select Mode',
					id: 'p1',
					default: '0',
					choices: self.lampMode
				}
			]
		},
		'mot':  {
			label: 'Motion Filter',
			options: [
				{
					type: 'dropdown',
					label: 'Select Filter',
					id: 'p1',
					default: '0',
					choices: self.motionFilter
				}
			]
		},
		'osd': {
			label: 'On Screen Display On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '1',
					choices: self.OnOff
				}
			]
		},
		'pip': {
			label: 'Picture In Picture On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '1',
					choices: self.OnOff
				}
			]
		},
		'ppp':  {
			label: 'PIP Position Preset',
			options: [
				{
					type: 'dropdown',
					label: 'Select Preset',
					id: 'p1',
					default: '0',
					choices: self.pipPreset
				}
			]
		},
		'pps': {
			label: 'Picture In Picture Swap'
		},
		'pwr': {
			label: 'Power On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '1',
					choices: self.OnOff
				}
			]
		},
		'sde': {
			label: 'Source Dialog Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Show / Hide',
					id: 'p1',
					default: '1',
					choices: self.EnableDisable
				}
			]
		},
			'shu': {
			label: 'Shutter Open / Close',
			options: [
				{
					type: 'dropdown',
					label: 'Open / Close',
					id: 'p1',
					default: '0',
					choices: self.shutter
				}
			]
		},
		'sin':  {
			label: 'Select Input',
			options: [
				{
					type: 'dropdown',
					label: 'Input:',
					id: 'p1',
					default: '1',
					choices: self.inputSelect
				}
			]
		},
		'sor':  {
			label: 'Select Orientation',
			options: [
				{
					type: 'dropdown',
					label: 'Orientation:',
					id: 'p1',
					default: '0',
					choices: self.selectOri
				}
			]
		},
		'std':  {
			label: 'Video Standard',
			options: [
				{
					type: 'dropdown',
					label: 'Video Standard',
					id: 'p1',
					default: '8',
					choices: self.videoStandard
				}
			]
		},
		'szp':  {
			label: 'Size Presets Position',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'p1',
					default: '0',
					choices: self.size
				}
			]
		},
		'tnt': {
			label: 'Tint',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Tint (0-1000 = 0%-100%, 505 = 50.5%)',
					min: 0,
					max: 1000,
					default: 1,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				},
			]
		},
		'vrt': {
			label: 'Vertical Position',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Vertical Position',
					min: 0,
					max: 9999,
					default: 500,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				},
			]
		},
		'wps':  {
			label: 'Geometry Correction (General)',
			options: [
				{
					type: 'dropdown',
					label: 'Warp Select',
					id: 'p1',
					default: '0',
					choices: self.warpSelBasic
				}
			]
		},
		'wrp':  {
			label: 'Geometry Correction (Mseries & Boxer)',
			options: [
				{
					type: 'dropdown',
					label: 'Warp Select',
					id: 'p1',
					default: '0',
					choices: self.warpSelMseries
				}
			]
		},
		'zom':  {
			label: 'Zoom (Fixed)',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Zoom Set (0-9999)',
					min: 0,
					max: 9999,
					default: 5000,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				},
			]
		},

	});
};

instance.prototype.action = function(action) {
	var self = this;
	var opt = action.options
	var cmd

	switch (action.action) {
		case 'alc':
			cmd = '(ALC ' + opt.p1 + ')';
			break;

		case 'apw':
			cmd = '(APW ' + opt.p1 + ')';
			break;

		case 'aro':
			cmd = '(ARO ' + opt.p1 + ')';
			break;

		case 'asr':
			cmd = '(ASR ' + pad2(opt.p1) + ' ' + opt.p2 + ')';
			break;

		case 'asu':
			cmd = '(ASU)';
			break;

		case 'brt':
			cmd = '(BRT ' + pad4(opt.p1) + ')';
			break;

		case 'ccs':
			cmd = '(CCS ' + opt.p1 + ')';
			break;

		case 'cha':
			cmd = '(CHA ' + pad2(opt.p1) + ')';
			break;

		case 'cle':
			cmd = '(CLE ' + opt.p1 + ')';
			break;

		case 'clr':
			cmd = '(CLR ' + pad4(opt.p1) + ')';
			break;

		case 'con':
			cmd = '(CON ' + pad4(opt.p1) + ')';
			break;

		case 'csp':
			cmd = '(CSP ' + opt.p1 + ')';
			break;

		case 'def':
			cmd = '(DEF ' + opt.p1 + ')';
			break;

		case 'eme':
			cmd = '(EME ' + opt.p1 + ')';
			break;

		case 'fcs':
			cmd = '(FCS ' + pad4(opt.p1) + ')';
			break;

		case 'fil':
			cmd = '(FIL ' + opt.p1 + ')';
			break;

		case 'frz':
			cmd = '(FRZ ' + opt.p1 + ')';
			break;

		case 'gam':
			cmd = '(GAM ' + opt.p1 +')';
			break;

		case 'hor':
			cmd = '(HOR' + opt.p1 + ')';
			break;

		case 'ils':
			cmd = '(ILS ' + opt.p1 +')';
			break;

		case 'iop':
			cmd = '(IOP ' + opt.p1 +')';
			break;

		case 'itpBasic':
			cmd = '(ITP ' + opt.p1 + ')';
			break;

		case 'itpBoxer':
			cmd = '(ITP ' + opt.p1 + ')';
			break;

		case 'itpMser':
			cmd = '(ITP ' + opt.p1 + ')';
			break;

		case 'ken':
			cmd = '(KEN ' + opt.p1 + ' ' + opt.p2 + ')';
			break;

		case 'key':
			cmd = '(KEY ' + opt.p1 + ')(KEY ' + (Number(opt.p1) + 128) + ')';
			break;

		case 'lcb':
			cmd = '(LCB ' + opt.p1 + ')';
			break;

		case 'lcn':
			cmd = '(LCN)';
			break;

		case 'lco':
			cmd = '(LCO ' + opt.p1 + ')';
			break;

		case 'lng':
			cmd = '(LNG ' + opt.p1 + ')';
			break;

		case 'lop':
			cmd = '(LOP ' + opt.p1 + ')';
			break;

		case 'lpc':
			cmd = '(LPC ' + opt.p1 + ')';
			break;

		case 'lph':
			cmd = '(LPH?)';
			break;


		case 'lpi':
			cmd = '(LPI ' + pad4(opt.p1) +')';
			break;

		case 'lpm':
			cmd = '(LPM ' + opt.p1 + ')';
			break;

		case 'mot':
			cmd = '(MOT ' + opt.p1 + ')';
			break;

		case 'osd':
			cmd = '(OSD ' + opt.p1 + ')';
			break;

		case 'pip':
			cmd = '(PIP ' + opt.p1 + ')';
			break;

		case 'ppp':
			cmd = '(PPP ' + opt.p1 + ')';
			break;

		case 'pps':
			cmd = '(PPS)';
			break;

		case 'pwr':
			cmd = '(PWR ' + opt.p1 + ')';
			break;

		case 'sde':
			cmd = '(SDE ' + opt.p1 +')';
			break;

		case 'shu':
			cmd = '(SHU ' + pad3(opt.p1) +')';
			break;

		case 'sin':
			cmd = '(SIN ' + opt.p1 +')';
			break;

		case 'sor':
			cmd = '(SOR ' + opt.p1 +')';
			break;

		case 'std':
			cmd = '(STD ' + opt.p1 +')';
			break;

		case 'szp':
			cmd = '(SZP ' + opt.p1 +')';
			break;

		case 'tnt':
			cmd = '(TNT ' + opt.p1 +')';
			break;

		case 'vrt':
			cmd = '(VRT ' + opt.p1 +')';
			break;

		case 'wps':
			cmd = '(WPS ' + opt.p1 + ')';
			break;

		case 'wrp':
			cmd = '(WRP+SLCT ' + opt.p1 + ')';
			break;

		case 'zom':
			cmd = '(ZOM ' + pad4(opt.p1) + ')';
			break;

		//TODO make input select need to fetch the available input configurations from the projector


	}

	if (cmd !== undefined) {

		debug('sending ',cmd,"to",self.config.host);

		if (self.socket !== undefined && self.socket.connected) {
			self.socket.send(cmd);
			self.status(self.STATE_OK);
		}
		else {
			debug('Socket not connected :(');
		}

	}

	// debug('action():', action);

};

instance.prototype.update_variables = function (system) {
	var self = this;
	var variables = [];

	variables.push({
		label: 'Total Hours On Lamp 1',
		name: 'lamp_1'
	});

	variables.push({
		label: 'Total Hours On Lamp 2',
		name: 'lamp_2'
	});

	variables.push({
		label: 'Power State',
		name: 'power_state'
	});

	variables.push({
		label: 'Standby',
		name: 'standby'
	});

	variables.push({
		label: 'Signal State',
		name: 'signal_state'
	});

	variables.push({
		label: 'OSD Enabled',
		name: 'osd_enabled'
	});

	variables.push({
		label: 'Shutter State',
		name: 'shutter_closed'
	});

	variables.push({
		label: 'Input Channel',
		name: 'input_channel'
	});

	variables.push({
		label: 'Input Slot',
		name: 'input_slot'
	});

	variables.push({
		label: 'PIP Enabled',
		name: 'pip_enabled'
	});

	self.setVariable('lamp_1', 					self.lamp_1);
	self.setVariable('lamp_2', 					self.lamp_2);
	self.setVariable('power_state', 		self.power_state);
	self.setVariable('standby', 				self.standby);
	self.setVariable('signal_state', 		self.signal_state);
	self.setVariable('osd_enabled', 		self.osd_enabled);
	self.setVariable('shutter_closed', 	self.shutter_closed);
	self.setVariable('input_channel', 	self.input_channel);
	self.setVariable('input_slot', 			self.inputSelect.label);
	self.setVariable('pip_enabled', 		self.pip_enabled);

	self.setVariableDefinitions(variables);

	// feedbacks
	var feedbacks = {};

	feedbacks['power_state'] = {
		label: 'Power State',
		description: 'Change colors of bank depending on Power State',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color light',
				id: 'fg1',
				default: self.rgb(255,255,255)
			},
			{
				type: 'colorpicker',
				label: 'Foreground color dark',
				id: 'fg2',
				default: self.rgb(0,0,0)
			},
			{
				type: 'colorpicker',
				label: 'Background color on',
				id: 'bg1',
				default: self.rgb(0,204,0) // Green
			},
			{
				type: 'colorpicker',
				label: 'Background color off',
				id: 'bg2',
				default: self.rgb(255,0,0) // Rød
			},
			{
				type: 'colorpicker',
				label: 'Background color boot mode',
				id: 'bg3',
				default: self.rgb(255,255,0) // Yellow
			},
			{
				type: 'colorpicker',
				label: 'Background color cooldown',
				id: 'bg4',
				default: self.rgb(255,255,0) // Yellow
			},
			{
				type: 'colorpicker',
				label: 'Background color warm up',
				id: 'bg5',
				default: self.rgb(255,255,0) // Yellow
			}
		]
	};

	feedbacks['standby'] = {
		label: 'Standby On / Off',
		description: 'Change colors of bank if standby mode is on or not',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg1',
				default: self.rgb(255,255,255)
			},
			{
				type: 'colorpicker',
				label: 'Background color Off',
				id: 'bg1',
				default: self.rgb(255,0,0) // Red
			},
			{
				type: 'colorpicker',
				label: 'Background color On',
				id: 'bg2',
				default: self.rgb(0,204,0) // Green
			}
		]
	};

	feedbacks['signal_state'] = {
		label: 'Signal Status',
		description: 'Change colors of bank depending on signal status',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color light',
				id: 'fg1',
				default: self.rgb(255,255,255)
			},
			{
				type: 'colorpicker',
				label: 'Foreground color dark',
				id: 'fg2',
				default: self.rgb(0,0,0)
			},
			{
				type: 'colorpicker',
				label: 'Background color good signal',
				id: 'bg1',
				default: self.rgb(0,204,0) // Green
			},
			{
				type: 'colorpicker',
				label: 'Background color signal missing',
				id: 'bg2',
				default: self.rgb(255,0,0) // Rød
			},
			{
				type: 'colorpicker',
				label: 'Background color bad sync',
				id: 'bg3',
				default: self.rgb(255,255,0) // Yellow
			}
		]
	};

	feedbacks['osd_enabled'] = {
		label: 'OSD On / Off',
		description: 'Change colors of bank if On-Screne-Display mode is on or not',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg1',
				default: self.rgb(255,255,255)
			},
			{
				type: 'colorpicker',
				label: 'Background color Off',
				id: 'bg1',
				default: self.rgb(255,0,0) // Red
			},
			{
				type: 'colorpicker',
				label: 'Background color On',
				id: 'bg2',
				default: self.rgb(0,204,0) // Green
			}
		]
	};

	feedbacks['shutter_closed'] = {
		label: 'Shutter is closed',
		description: 'Change colors of bank if the shutter is closed',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg1',
				default: self.rgb(255,255,255)
			},
			{
				type: 'colorpicker',
				label: 'Background color Closed',
				id: 'bg1',
				default: self.rgb(255,0,0) // Red
			},
			{
				type: 'colorpicker',
				label: 'Background color Open',
				id: 'bg2',
				default: self.rgb(0,204,0) // Green
			}
		]
	};

	feedbacks['input_channel'] = {
		label: 'Video Channel: Change background color',
		description: 'If the channel specified is the active video channel, change colors of the bank',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg1',
				default: self.rgb(255,255,255)
			},
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg1',
				default: self.rgb(255,0,0) // Red
			},
			{
				type: 'number',
				id: 'input',
				label: 'Channel: (1-50)',
				min: 1,
				max: 50,
				default: 1,
				required: true,
				range: false,
				regex: self.REGEX_NUMBER
			}
		]
	};

	feedbacks['input_slot'] = {
		label: 'Input Slot: Change background color',
		description: 'If the slot specified is the active input slot, change colors of the bank',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg1',
				default: self.rgb(255,255,255)
			},
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg1',
				default: self.rgb(255,0,0) // Red
			},
			{
				type: 'dropdown',
				label: 'Input',
				id: 'input',
				default: '1',
				choices: self.inputSelect
			}
		]
	};


	feedbacks['pip_enabled'] = {
		label: 'PIP On / Off',
		description: 'Change colors of bank if Picture-in-Picture mode is on or not',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg1',
				default: self.rgb(255,255,255)
			},
			{
				type: 'colorpicker',
				label: 'Background color Off',
				id: 'bg1',
				default: self.rgb(255,0,0) // Red
			},
			{
				type: 'colorpicker',
				label: 'Background color On',
				id: 'bg2',
				default: self.rgb(0,204,0) // Green
			},
		]
	};

	self.setFeedbackDefinitions(feedbacks);
};

instance.prototype.feedback = function(feedback, bank) {
	var self = this;

	if (feedback.type == 'power_state') {
		if (self.power_state === 'On') {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg1
			};
		}
		else if (self.power_state === 'Off') {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg2
			};
		}
		else if (self.power_state === 'Boot') {
			return {
				color: feedback.options.fg2,
				bgcolor: feedback.options.bg3
			};
		}
		else if (self.power_state === 'Cool Down') {
			return {
				color: feedback.options.fg2,
				bgcolor: feedback.options.bg4
			};
		}
		else if (self.power_state === 'Warm Up') {
			return {
				color: feedback.options.fg2,
				bgcolor: feedback.options.bg5
			};
		}
	}

	else if (feedback.type == 'standby') {
		if (self.standby === 'Off') {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg1
			};
		}
		else if (self.standby === 'On') {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg2
			};
		}
	}

	else if (feedback.type == 'signal_state') {
		if (self.signal_state === 'Good Signal') {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg1
			};
		}
		else if (self.signal_state === 'Signal Missing') {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg2
			};
		}
		else if (self.signal_state === 'Bad Sync') {
			return {
				color: feedback.options.fg2,
				bgcolor: feedback.options.bg3
			};
		}
	}

	else if (feedback.type == 'osd_enabled') {
		if (self.osd_enabled === 'Off') {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg1
			};
		}
		else if (self.osd_enabled === 'On') {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg2
			};
		}
	}

	else if (feedback.type == 'shutter_closed') {
		if (self.shutter_closed === 'Closed') {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg1
			};
		}
		else if (self.shutter_closed === 'Open') {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg2
			};
		}
	}

	else 	if (feedback.type == 'input_channel') {
		if (self.input_channel == pad3(feedback.options.input)) {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg1
			};
		}
	}

	else 	if (feedback.type == 'input_slot') {
		if (self.input_slot == feedback.options.input) {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg1
			};
		}
	}

	else if (feedback.type == 'pip_enabled') {
		if (self.pip_enabled === 'Off') {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg1
			};
		}
		else if (self.pip_enabled === 'On') {
			return {
				color: feedback.options.fg1,
				bgcolor: feedback.options.bg2
			};
		}
	}

};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
