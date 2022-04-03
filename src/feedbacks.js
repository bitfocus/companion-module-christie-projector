const util = require('./util.js');

module.exports = {
	// ##########################
	// #### Define Feedbacks ####
	// ##########################
	setFeedbacks: function () {
		let self = this;
		let feedbacks = {};

		const foregroundColor = self.rgb(255, 255, 255) // White
		const backgroundColorRed = self.rgb(255, 0, 0) // Red
		const backgroundColorGreen = self.rgb(0, 255, 0) // Green
		const backgroundColorOrange = self.rgb(255, 102, 0) // Orange

		feedbacks.power_state = {
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
			],
			callback: function (feedback, bank) {
				let opt = feedback.options;
		
				if (self.power_state === 'On') {
					return {
						color: opt.fg1,
						bgcolor: opt.bg1
					};
				}
				else if (self.power_state === 'Off') {
					return {
						color: opt.fg1,
						bgcolor: opt.bg2
					};
				}
				else if (self.power_state === 'Boot') {
					return {
						color: opt.fg2,
						bgcolor: opt.bg3
					};
				}
				else if (self.power_state === 'Cool Down') {
					return {
						color: opt.fg2,
						bgcolor: opt.bg4
					};
				}
				else if (self.power_state === 'Warm Up') {
					return {
						color: opt.fg2,
						bgcolor: opt.bg5
					};
				}
			}
		};
		
		feedbacks.standby = {
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
			],
			callback: function (feedback, bank) {
				let opt = feedback.options;
		
				if (self.standby === 'Off') {
					return {
						color: opt.fg1,
						bgcolor: opt.bg1
					};
				}
				else if (self.standby === 'On') {
					return {
						color: opt.fg1,
						bgcolor: opt.bg2
					};
				}
			}
		};
		
		feedbacks.signal_state = {
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
			],
			callback: function (feedback, bank) {
				let opt = feedback.options;
		
				if (self.signal_state === 'Good Signal') {
					return {
						color: opt.fg1,
						bgcolor: opt.bg1
					};
				}
				else if (self.signal_state === 'Signal Missing') {
					return {
						color: opt.fg1,
						bgcolor: opt.bg2
					};
				}
				else if (self.signal_state === 'Bad Sync') {
					return {
						color: opt.fg2,
						bgcolor: opt.bg3
					};
				}
			}
		};
		
		feedbacks.osd_enabled = {
			label: 'OSD On / Off',
			description: 'Change colors of bank if On-Screen-Display mode is on or not',
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
			],
			callback: function (feedback, bank) {
				let opt = feedback.options;
		
				if (self.osd_enabled === 'Off') {
					return {
						color: opt.fg1,
						bgcolor: opt.bg1
					};
				}
				else if (self.osd_enabled === 'On') {
					return {
						color: opt.fg1,
						bgcolor: opt.bg2
					};
				}
			}
		};
		
		feedbacks.shutter_closed = {
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
			],
			callback: function (feedback, bank) {
				let opt = feedback.options;
		
				if (self.shutter_closed === 'Closed') {
					return {
						color: opt.fg1,
						bgcolor: opt.bg1
					};
				}
				else if (self.shutter_closed === 'Open') {
					return {
						color: opt.fg1,
						bgcolor: opt.bg2
					};
				}
			}
		};
		
		feedbacks.input_channel = {
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
			],
			callback: function (feedback, bank) {
				let opt = feedback.options;
		
				if (self.input_channel == util.pad3(opt.input)) {
					return {
						color: opt.fg1,
						bgcolor: opt.bg1
					};
				}
			}
		};
		
		feedbacks.input_slot = {
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
			],
			callback: function (feedback, bank) {
				let opt = feedback.options;
		
				if (self.input_slot == opt.input) {
					return {
						color: opt.fg1,
						bgcolor: opt.bg1
					};
				}
			}
		};
		
		
		feedbacks.pip_enabled = {
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
			],
			callback: function (feedback, bank) {
				let opt = feedback.options;
		
				if (self.pip_enabled === 'Off') {
					return {
						color: opt.fg1,
						bgcolor: opt.bg1
					};
				}
				else if (self.pip_enabled === 'On') {
					return {
						color: opt.fg1,
						bgcolor: opt.bg2
					};
				}
			}
		};

		return feedbacks
	}
}


