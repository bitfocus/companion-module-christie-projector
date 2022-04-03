const choices = require('./choices.js');

module.exports = {
	setPresets: function () {
		let self = this;
		let presets = [];

		const foregroundColor = self.rgb(255, 255, 255) // White
		const foregroundColorBlack = self.rgb(0, 0, 0) // Black
		const backgroundColorRed = self.rgb(255, 0, 0) // Red
		const backgroundColorWhite = self.rgb(255, 255, 255) // White

		// ###################### Auto Source ######################

		// Auto Source ON / OFF
		for (let input = 0; input < 50; input++) {
			for (let input2 in choices.OnOff) {
				presets.push({
					category: 'Auto Source',
					label: ' Auto Source ' + (input+1) + ' ' + choices.OnOff[input2].label,
					bank: {
						style: 'text',
						text: 'ASR CH ' + (input+1) + ' ' + choices.OnOff[input2].label,
						size: 'auto',
						color: '16777215',
						bgcolor: self.rgb(0, 0, 0)
					},
					actions: [
						{
							action: 'asr',
							options: {
								p1: (input+1),
								p2: choices.OnOff[input2].id
							}
						}
					],
				});
			}
		}

		// ###################### Brightness ######################

		// Brightness Set 0-100%
		for (let input = 0; input < 11; input++) {
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
		for (let input = 0; input < 11; input++) {
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
		for (let input = 0; input < 11; input++) {
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
		for (let input = 0; input < 11; input++) {
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
		for (let input = 0; input < 19; input++) {
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
		for (let input in choices.motionFilter) {
			presets.push({
				category: 'Motion Filter',
				label: 'Motion Filter ' + choices.motionFilter[input].label,
				bank: {
					style: 'text',
					text: 'Motion ' + choices.motionFilter[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'mot',
						options: {
							p1: choices.motionFilter[input].id
						}
					}
				],
			});
		}

		// ###################### Picture / Image ######################

		// Aspect Ratio Overlay ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				category: 'Image',
				label: 'Aspect Ratio Overlay ' + choices.OnOff[input].label,
				bank: {
					style: 'text',
					text: 'ARO ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'aro',
						options: {
							p1: choices.OnOff[input].id
						}
					}
				],
			});
		}

		// Freeze Image ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				category: 'Image',
				label: 'Freeze Image ' + choices.OnOff[input].label,
				bank: {
					style: 'text',
					text: 'Freeze ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'frz',
						options: {
							p1: choices.OnOff[input].id
						}
					}
				],
			});
		}

		// Select Color Output / Profile
		for (let input in choices.colorProfile) {
			presets.push({
				category: 'Image',
				label: 'Select Color Output/Profile ' + choices.colorProfile[input].label,
				bank: {
					style: 'text',
					text: 'Color Prof. ' + choices.colorProfile[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'ccs',
						options: {
							p1: choices.colorProfile[input].id
						}
					}
				],
			});
		}

		// Color Space
		for (let input in choices.colorSpace) {
			presets.push({
				category: 'Image',
				label: 'Color Space ' + choices.colorSpace[input].label,
				bank: {
					style: 'text',
					text: 'Color Space ' + choices.colorSpace[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'csp',
						options: {
							p1: choices.colorSpace[input].id
						}
					}
				],
			});
		}

		// Color Enable
		for (let input in choices.colorName) {
			presets.push({
				category: 'Image',
				label: 'Color Enable ' + choices.colorName[input].label,
				bank: {
					style: 'text',
					text: 'Color En. ' + choices.colorName[input].label,
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'cle',
						options: {
							p1: choices.colorName[input].id
						}
					}
				],
			});
		}

		// Input Filter
		for (let input in choices.inputFilter) {
			presets.push({
				category: 'Image',
				label: 'Input Filter ' + choices.inputFilter[input].label,
				bank: {
					style: 'text',
					text: 'Filter ' + choices.inputFilter[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'fil',
						options: {
							p1: choices.inputFilter[input].id
						}
					}
				],
			});
		}

		// Image Optimazation
		for (let input in choices.imageOpti) {
			presets.push({
				category: 'Image',
				label: 'Image Optimazation ' + choices.imageOpti[input].label,
				bank: {
					style: 'text',
					text: 'Image Op. ' + choices.imageOpti[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'iop',
						options: {
							p1: choices.imageOpti[input].id
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
		for (let input in choices.selectOri) {
			presets.push({
				category: 'Position',
				label: 'Screen Orientation ' + choices.selectOri[input].label,
				bank: {
					style: 'text',
					text: 'Orient. ' + choices.selectOri[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'sor',
						options: {
							p1: choices.selectOri[input].id
						}
					}
				],
			});
		}

		// Screen Size Preset
		for (let input in choices.size) {
			presets.push({
				category: 'Position',
				label: 'Screen Size Preset ' + choices.size[input].label,
				bank: {
					style: 'text',
					text: 'Size Preset ' + choices.size[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'szp',
						options: {
							p1: choices.size[input].id
						}
					}
				],
			});
		}

		// ###################### Warp Select (Basic) ######################

		// Warp Select (Basic)
		for (let input in choices.warpSelBasic) {
			presets.push({
				category: 'Warp Select (Basic)',
				label: 'Warp Select (Basic) ' + choices.warpSelBasic[input].label,
				bank: {
					style: 'text',
					text: 'Warp Basic: ' + choices.warpSelBasic[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'wps',
						options: {
							p1: choices.warpSelBasic[input].id
						}
					}
				],
			});
		}

		// ###################### Warp Select (M-series/Boxer) ######################

		// Warp Select (M-series/Boxer)
		for (let input in choices.warpSelMseries) {
			presets.push({
				category: 'Warp Select (M-Serise)',
				label: 'Warp Select (M-series/Boxer) ' + choices.warpSelMseries[input].label,
				bank: {
					style: 'text',
					text: 'Warp Mser: ' + choices.warpSelMseries[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'wrp',
						options: {
							p1: choices.warpSelMseries[input].id
						}
					}
				],
			});
		}

		// ###################### Lens ######################

		// Automatic Lens Calibration ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				category: 'Lens',
				label: 'Automatic Lens Calibration ' + choices.OnOff[input].label,
				bank: {
					style: 'text',
					text: 'Lamp Auto Cali. ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'alc',
						options: {
							p1: choices.OnOff[input].id
						}
					}
				],
			});
		}

		// Lens Calibrate
		for (let input in choices.lensCal) {
			presets.push({
				category: 'Lens',
				label: 'Lens Calibrate ' + choices.lensCal[input].label,
				bank: {
					style: 'text',
					text: 'Lamp Cali. ' + choices.lensCal[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'lcb',
						options: {
							p1: choices.lensCal[input].id
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
		for (let input in choices.OnOff) {
			presets.push({
				category: 'Lens',
				label: 'Intelligent Lens System ' + choices.OnOff[input].label,
				bank: {
					style: 'text',
					text: 'ILS ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'ils',
						options: {
							p1: choices.OnOff[input].id
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
		for (let input in choices.OnOff) {
			presets.push({
				category: 'Lamp',
				label: 'Lamp Conditioning ' + choices.OnOff[input].label,
				bank: {
					style: 'text',
					text: 'Lamp Con ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'lco',
						options: {
							p1: choices.OnOff[input].id
						}
					}
				],
			});
		}

		// Lamp Operation
		for (let input in choices.lampOp) {
			presets.push({
				category: 'Lamp',
				label: 'Lamp Operation ' + choices.lampOp[input].label,
				bank: {
					style: 'text',
					text: 'Lamp Op ' + choices.lampOp[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'lop',
						options: {
							p1: choices.lampOp[input].id
						}
					}
				],
			});
		}

		// Lamp Mode
		for (let input in choices.lampMode) {
			presets.push({
				category: 'Lamp',
				label: 'Lamp Mode ' + choices.lampMode[input].label,
				bank: {
					style: 'text',
					text: 'Lamp Mode ' + choices.lampMode[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'lpm',
						options: {
							p1: choices.lampMode[input].id
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
		for (let input in choices.inputSelect) {
			presets.push({
				category: 'Input Slot',
				label: 'Slot ' + choices.inputSelect[input].label,
				bank: {
					style: 'text',
					text: 'Slot ' + choices.inputSelect[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: 0
				},
				actions: [{
					action: 'sin',
					options: {
						p1: choices.inputSelect[input].label,
					}
				}],
				feedbacks: [
					{
						type: 'input_slot',
						options: {
							fg1: self.rgb(255, 255, 255),
							bg1: self.rgb(255, 0, 0),
							input: choices.inputSelect[input].id
						}
					}
				]
			});

		}

		// ###################### Internal Test Pattern (General/Basic) ######################

		// Internal Test Pattern (General/Basic)
		for (let input in choices.tpatBasic) {
			presets.push({
				category: 'Test Pattern (Basic)',
				label: 'Internal Test Pattern (General/Basic) ' + choices.tpatBasic[input].label,
				bank: {
					style: 'text',
					text: 'ITP ' + choices.tpatBasic[input].label,
					size: '14',
					color: '16777215',
					bgcolor: 0
				},
				actions: [{
					action: 'itpBasic',
					options: {
						p1: choices.tpatBasic[input].label,
					}
				}]
			});
		}

		// ###################### Internal Test Pattern (Boxer) ######################

		// Internal Test Pattern (Boxer)
		for (let input in choices.tpatBoxer) {
			presets.push({
				category: 'Test Pattern (Boxer)',
				label: 'Internal Test Pattern (Boxer) ' + choices.tpatBoxer[input].label,
				bank: {
					style: 'text',
					text: 'ITP ' + choices.tpatBoxer[input].label,
					size: '14',
					color: '16777215',
					bgcolor: 0
				},
				actions: [{
					action: 'itpBoxer',
					options: {
						p1: choices.tpatBoxer[input].label,
					}
				}]
			});
		}

		// ###################### Internal Test Pattern (M-Series) ######################

		// Internal Test Pattern (Boxer)
		for (let input in choices.tpatMser) {
			presets.push({
				category: 'Test Pattern (M-Series)',
				label: 'Internal Test Pattern (M-Series) ' + choices.tpatMser[input].label,
				bank: {
					style: 'text',
					text: 'ITP ' + choices.tpatMser[input].label,
					size: '14',
					color: '16777215',
					bgcolor: 0
				},
				actions: [{
					action: 'itpMser',
					options: {
						p1: choices.tpatMser[input].label,
					}
				}]
			});
		}

		// ###################### Picture-In-Picture ######################

		// PIP ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				category: 'PIP',
				label: 'Picture In Picture ' + choices.OnOff[input].label,
				bank: {
					style: 'text',
					text: 'PIP ' + choices.OnOff[input].label + ' $(ChristiePj:pip_enabled)',
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'pip',
						options: {
							p1: choices.OnOff[input].id
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
		for (let input in choices.pipPreset) {
			presets.push({
				category: 'PIP',
				label: 'Picture In Picture Preset' + choices.pipPreset[input].label,
				bank: {
					style: 'text',
					text: 'PIP ' + choices.pipPreset[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'ppp',
						options: {
							p1: choices.pipPreset[input].id
						}
					}
				],
			});
		}

		// ###################### Key Pad ######################

		// Keypad Enable
		for (let input in choices.keypadEnableP1) {
			for (let input2 in choices.keypadEnableP2) {
				presets.push({
					category: 'Keypad ' + choices.keypadEnableP1[input].label,
					label: choices.keypadEnableP1[input].label + ' ' + choices.keypadEnableP2[input2].label,
					bank: {
						style: 'text',
						text: choices.keypadEnableP1[input].label + ' ' + choices.keypadEnableP2[input2].label,
						size: 'auto',
						color: '16777215',
						bgcolor: self.rgb(0, 0, 0)
					},
					actions: [
						{
							action: 'ken',
							options: {
								p1: choices.keypadEnableP1[input].id,
								p2: choices.keypadEnableP2[input2].id
							}
						}
					],
				});
			}
		}

		// ###################### Key Codes ######################

		// Key Code
		for (let input in choices.keyCode) {
			presets.push({
				category: 'Key Codes',
				label: 'Key Code:' + choices.keyCode[input].label,
				bank: {
					style: 'text',
					text: 'KEY: ' + choices.keyCode[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'key',
						options: {
							p1: choices.keyCode[input].id
						}
					}
				],
			});
		}

		// ###################### Language ######################

		// Set Language
		for (let input in choices.language) {
			presets.push({
				category: 'Language',
				label: 'Set Language:' + choices.language[input].label,
				bank: {
					style: 'text',
					text: 'LNG: ' + choices.language[input].label,
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'lng',
						options: {
							p1: choices.language[input].id
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
		for (let input in choices.OnOff) {
			presets.push({
				category: 'Commands',
				label: 'Auto Power Up ' + choices.OnOff[input].label,
				bank: {
					style: 'text',
					text: 'Auto PWR ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'apw',
						options: {
							p1: choices.OnOff[input].id
						}
					}
				],
			});
		}

		// Power ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				category: 'Commands',
				label: 'Power ' + choices.OnOff[input].label,
				bank: {
					style: 'text',
					text: 'PWR ' + choices.OnOff[input].label +' $(ChristiePj:power_state)',
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'pwr',
						options: {
							p1: choices.OnOff[input].id
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
		for (let input in choices.shutter) {
			presets.push({
				category: 'Commands',
				label: 'Shutter ' + choices.shutter[input].label,
				bank: {
					style: 'text',
					text: 'Shutter ' + choices.shutter[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'shu',
						options: {
							p1: choices.shutter[input].id
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
		for (let input in choices.OnOff) {
			presets.push({
				category: 'Commands',
				label: 'On Screen Display ' + choices.OnOff[input].label,
				bank: {
					style: 'text',
					text: 'OSD ' + choices.OnOff[input].label + ' $(ChristiePj:osd_enabled)',
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'osd',
						options: {
							p1: choices.OnOff[input].id
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
		for (let input in choices.OnOff) {
			presets.push({
				category: 'Commands',
				label: 'Source Dialog Enable ' + choices.OnOff[input].label,
				bank: {
					style: 'text',
					text: 'Source Dia En. ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'sde',
						options: {
							p1: choices.OnOff[input].id
						}
					}
				],
			});
		}

		// Error Message Enable
		for (let input in choices.errorEnable) {
			presets.push({
				category: 'Commands',
				label: 'Error Message Enable ' + choices.errorEnable[input].label,
				bank: {
					style: 'text',
					text: 'ERR MSG: ' + choices.errorEnable[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0)
				},
				actions: [
					{
						action: 'eme',
						options: {
							p1: choices.errorEnable[input].id
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
				text: 'PWR: $(ChristiePj:power_state)',
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
				text: 'STB: $(ChristiePj:standby)',
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

		/**************LENS SHIFT CONTROLS ************/
		presets.push({
			category: 'Lens Shift',
			label: 'LEFT',
			bank: {
				style: 'png',
				text: '',
				png64: self.ICON_LEFT,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'lensshift_move_h_neg',
				}
			],
			release_actions: [
				{
					action: 'lensshift_move_h_stop',
				}
			]
		})

		presets.push({
			category: 'Lens Shift',
			label: 'RIGHT',
			bank: {
				style: 'png',
				text: '',
				png64: self.ICON_RIGHT,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'lensshift_move_h_pos',
				}
			],
			release_actions: [
				{
					action: 'lensshift_move_h_stop',
				}
			]
		})

		presets.push({
			category: 'Lens Shift',
			label: 'UP',
			bank: {
				style: 'png',
				text: '',
				png64: self.ICON_UP,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'lensshift_move_v_neg',
				}
			],
			release_actions: [
				{
					action: 'lensshift_move_v_stop',
				}
			]
		})

		presets.push({
			category: 'Lens Shift',
			label: 'DOWN',
			bank: {
				style: 'png',
				text: '',
				png64: self.ICON_DOWN,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'lensshift_move_v_pos',
				}
			],
			release_actions: [
				{
					action: 'lensshift_move_v_stop',
				}
			]
		})

		presets.push({
			category: 'Lens Shift',
			label: 'Focus -',
			bank: {
				style: 'png',
				text: 'F-',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'lensshift_focus_neg',
				}
			],
			release_actions: [
				{
					action: 'lensshift_focus_stop',
				}
			]
		})

		presets.push({
			category: 'Lens Shift',
			label: 'Focus +',
			bank: {
				style: 'png',
				text: 'F+',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'lensshift_focus_pos',
				}
			],
			release_actions: [
				{
					action: 'lensshift_focus_stop',
				}
			]
		})

		presets.push({
			category: 'Lens Shift',
			label: 'Zoom -',
			bank: {
				style: 'png',
				text: 'Z-',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'lensshift_zoom_neg',
				}
			],
			release_actions: [
				{
					action: 'lensshift_zoom_stop',
				}
			]
		})

		presets.push({
			category: 'Lens Shift',
			label: 'Zoom +',
			bank: {
				style: 'png',
				text: 'Z+',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'lensshift_zoom_pos',
				}
			],
			release_actions: [
				{
					action: 'lensshift_zoom_stop',
				}
			]
		})
	
		return presets;
	}
}