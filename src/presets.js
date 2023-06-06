const { combineRgb } = require('@companion-module/base')

const choices = require('./choices.js');

module.exports = {
	initPresets: function () {
		let self = this;
		let presets = [];

		// ###################### Auto Source ######################

		// Auto Source ON / OFF
		for (let input = 0; input < 50; input++) {
			for (let input2 in choices.OnOff) {
				presets.push({
					type: 'button',
					category: 'Auto Source',
					name: ' Auto Source ' + (input+1) + ' ' + choices.OnOff[input2].label,
					style: {
						text: 'ASR CH ' + (input+1) + ' ' + choices.OnOff[input2].label,
						size: 'auto',
						color: '16777215',
						bgcolor: combineRgb(0, 0, 0)
					},
					steps: [
						{
							down: [
								{
									actionId: 'asr',
									options: {
										p1: (input+1),
										p2: choices.OnOff[input2].id
									}
								}
							],
							up: []
						}
					],
					feedbacks: []
				});
			}
		}

		// ###################### Brightness ######################

		// Brightness Set 0-100%
		for (let input = 0; input < 11; input++) {
			presets.push({
				type: 'button',
				category: 'Brightness',
				name: 'Brightness Set ' + (input*10) + '%',
				style: {
					text: 'Bright ' + (input*10) + '%',
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'brt',
								options: {
									p1: (input*100),
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Constrast ######################

		// Contrast Set 0-100%
		for (let input = 0; input < 11; input++) {
			presets.push({
				type: 'button',
				category: 'Contrast',
				name: 'Contrast Set ' + (input*10) + '%',
				style: {
					text: 'Cont. ' + (input*10) + '%',
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'con',
								options: {
									p1: (input*100),
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Color ######################

		// Color Set 0-100%
		for (let input = 0; input < 11; input++) {
			presets.push({
				type: 'button',
				category: 'Color',
				name: 'Color Set ' + (input*10) + '%',
				style: {
					text: 'Color ' + (input*10) + '%',
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'clr',
								options: {
									p1: (input*100),
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Tint ######################

		// Tint Set 0-100%
		for (let input = 0; input < 11; input++) {
			presets.push({
				type: 'button',
				category: 'Tint',
				name: 'Tint Set ' + (input*10) + '%',
				style: {
					text: 'Tint ' + (input*10) + '%',
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'tnt',
								options: {
									p1: (input*100),
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Gamma ######################

		// Gamma Set 100-280 = 1.8-2.0
		for (let input = 0; input < 19; input++) {
			presets.push({
				type: 'button',
				category: 'Gamma',
				name: 'Gamma Set ' + (input*10+100),
				style: {
					text: 'Gamma ' + (input*10+100),
					size: '18',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'gam',
								options: {
									p1: (input*10+100),
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Motion Filter ######################

		// Motion Filter
		for (let input in choices.motionFilter) {
			presets.push({
				type: 'button',
				category: 'Motion Filter',
				name: 'Motion Filter ' + choices.motionFilter[input].label,
				style: {
					text: 'Motion ' + choices.motionFilter[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'mot',
								options: {
									p1: choices.motionFilter[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Picture / Image ######################

		// Aspect Ratio Overlay ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				type: 'button',
				category: 'Image',
				name: 'Aspect Ratio Overlay ' + choices.OnOff[input].label,
				style: {
					text: 'ARO ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'aro',
								options: {
									p1: choices.OnOff[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Freeze Image ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				type: 'button',
				category: 'Image',
				name: 'Freeze Image ' + choices.OnOff[input].label,
				style: {
					text: 'Freeze ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'frz',
								options: {
									p1: choices.OnOff[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Select Color Output / Profile
		for (let input in choices.colorProfile) {
			presets.push({
				type: 'button',
				category: 'Image',
				name: 'Select Color Output/Profile ' + choices.colorProfile[input].label,
				style: {
					text: 'Color Prof. ' + choices.colorProfile[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'ccs',
								options: {
									p1: choices.colorProfile[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Color Space
		for (let input in choices.colorSpace) {
			presets.push({
				type: 'button',
				category: 'Image',
				name: 'Color Space ' + choices.colorSpace[input].label,
				style: {
					text: 'Color Space ' + choices.colorSpace[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'csp',
								options: {
									p1: choices.colorSpace[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Color Enable
		for (let input in choices.colorName) {
			presets.push({
				type: 'button',
				category: 'Image',
				name: 'Color Enable ' + choices.colorName[input].label,
				style: {
					text: 'Color En. ' + choices.colorName[input].label,
					size: '14',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'cle',
								options: {
									p1: choices.colorName[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Input Filter
		for (let input in choices.inputFilter) {
			presets.push({
				type: 'button',
				category: 'Image',
				name: 'Input Filter ' + choices.inputFilter[input].label,
				style: {
					text: 'Filter ' + choices.inputFilter[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'fil',
								options: {
									p1: choices.inputFilter[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Image Optimazation
		for (let input in choices.imageOpti) {
			presets.push({
				type: 'button',
				category: 'Image',
				name: 'Image Optimazation ' + choices.imageOpti[input].label,
				style: {
					text: 'Image Op. ' + choices.imageOpti[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'iop',
								options: {
									p1: choices.imageOpti[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Position ######################

		// Horizontal Position
		presets.push({
			type: 'button',
			category: 'Position',
			name: 'Horizontal Position: 500',
			style: {
				style: 'text',
				text: 'Hori. Pos 500',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'hor',
							options: {
								p1: '500'
							}
						}
					],
					up: []
				}
			],
			feedbacks: []
		});

		// Vertical Position
		presets.push({
			type: 'button',
			category: 'Position',
			name: 'Vertical Position: 500',
			style: {
				style: 'text',
				text: 'Vert. Pos 500',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'vrt',
							options: {
								p1: '500'
							}
						}
					],
					up: []
				}
			],
			feedbacks: []
		});

		// Screen Orientation
		for (let input in choices.selectOri) {
			presets.push({
				type: 'button',
				category: 'Position',
				name: 'Screen Orientation ' + choices.selectOri[input].label,
				style: {
					text: 'Orient. ' + choices.selectOri[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'sor',
								options: {
									p1: choices.selectOri[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Screen Size Preset
		for (let input in choices.size) {
			presets.push({
				type: 'button',
				category: 'Position',
				name: 'Screen Size Preset ' + choices.size[input].label,
				style: {
					text: 'Size Preset ' + choices.size[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'szp',
								options: {
									p1: choices.size[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Warp Select (Basic) ######################

		// Warp Select (Basic)
		for (let input in choices.warpSelBasic) {
			presets.push({
				type: 'button',
				category: 'Warp Select (Basic)',
				name: 'Warp Select (Basic) ' + choices.warpSelBasic[input].label,
				style: {
					text: 'Warp Basic: ' + choices.warpSelBasic[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'wps',
								options: {
									p1: choices.warpSelBasic[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Warp Select (M-series/Boxer) ######################

		// Warp Select (M-series/Boxer)
		for (let input in choices.warpSelMseries) {
			presets.push({
				type: 'button',
				category: 'Warp Select (M-Serise)',
				name: 'Warp Select (M-series/Boxer) ' + choices.warpSelMseries[input].label,
				style: {
					text: 'Warp Mser: ' + choices.warpSelMseries[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'wrp',
								options: {
									p1: choices.warpSelMseries[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Lens ######################

		// Automatic Lens Calibration ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				type: 'button',
				category: 'Lens',
				name: 'Automatic Lens Calibration ' + choices.OnOff[input].label,
				style: {
					text: 'Lamp Auto Cali. ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'alc',
								options: {
									p1: choices.OnOff[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Lens Calibrate
		for (let input in choices.lensCal) {
			presets.push({
				type: 'button',
				category: 'Lens',
				name: 'Lens Calibrate ' + choices.lensCal[input].label,
				style: {
					text: 'Lamp Cali. ' + choices.lensCal[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'lcb',
								options: {
									p1: choices.lensCal[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Lens Center
		presets.push({
			type: 'button',
			category: 'Lens',
			name: 'Lens Center',
			style: {
				style: 'text',
				text: 'Lens Center',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lcn',
							options: {}
						}
					],
					up: []
				}
			],
			feedbacks: []
		});

		// Intelligent Lens System ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				type: 'button',
				category: 'Lens',
				name: 'Intelligent Lens System ' + choices.OnOff[input].label,
				style: {
					text: 'ILS ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'ils',
								options: {
									p1: choices.OnOff[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Zoom
		presets.push({
			type: 'button',
			category: 'Lens',
			name: 'Zoom',
			style: {
				style: 'text',
				text: 'Zoom 5000',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'zom',
							options: {
								p1: '5000'
							}
						}
					],
					up: []
				}
			],
			feedbacks: []
		});

		// Focus
		presets.push({
			type: 'button',
			category: 'Lens',
			name: 'Focus',
			style: {
				style: 'text',
				text: 'Focus 4000',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'fcs',
							options: {
								p1: '4000'
							}
						}
					],
					up: []
				}
			],
			feedbacks: []
		});

		// ###################### Lamp ######################

		// Get Lamp ON Time
		presets.push({
			type: 'button',
			category: 'Lamp',
			name: 'Get Lamp ON Time',
			style: {
				style: 'text',
				text: 'Get Lamp Time',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lph',
							options: {}
						}
					],
					up: []
				}
			],
			feedbacks: []
		});

		// Lamp Conditioning ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				type: 'button',
				category: 'Lamp',
				name: 'Lamp Conditioning ' + choices.OnOff[input].label,
				style: {
					text: 'Lamp Con ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'lco',
								options: {
									p1: choices.OnOff[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Lamp Operation
		for (let input in choices.lampOp) {
			presets.push({
				type: 'button',
				category: 'Lamp',
				name: 'Lamp Operation ' + choices.lampOp[input].label,
				style: {
					text: 'Lamp Op ' + choices.lampOp[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'lop',
								options: {
									p1: choices.lampOp[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Lamp Mode
		for (let input in choices.lampMode) {
			presets.push({
				type: 'button',
				category: 'Lamp',
				name: 'Lamp Mode ' + choices.lampMode[input].label,
				style: {
					text: 'Lamp Mode ' + choices.lampMode[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'lpm',
								options: {
									p1: choices.lampMode[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Lamp Intensity
		presets.push({
			type: 'button',
			category: 'Lamp',
			name: 'Lamp Intensity',
			style: {
				style: 'text',
				text: 'Lamp Intensity 100',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lpi',
							options: {
								p1: '100'
							}
						}
					],
					up: []
				}
			],
			feedbacks: []
		});

		// Lamp Changed
		presets.push({
			type: 'button',
			category: 'Lamp',
			name: 'Lamp Changed',
			style: {
				style: 'text',
				text: 'Lamp Changed',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lpc',
							options: {
								p1: ''
							}
						}
					],
					up: []
				}
			],
			feedbacks: []
		});

		// ###################### Input Channel ######################

		// Set Input Channel
		for (let i = 0; i < 50; i++) {
			presets.push({
				type: 'button',
				category: 'Select Channel',
				name: 'CH ' + (i+1),
				style: {
					text: 'CH ' + (i+1),
					size: 'auto',
					color: '16777215',
					bgcolor: 0
				},
				steps: [
					{
						down: [
							{
								actionId: 'cha',
								options: {
									p1: (i+1),
								}
							}
						],
						up: []
					}
				],
				feedbacks: [
					{
						feedbackId: 'input_channel',
						options: {
							fg1: combineRgb(255, 255, 255),
							bg1: combineRgb(255, 0, 0),
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
				type: 'button',
				category: 'Input Slot',
				name: 'Slot ' + choices.inputSelect[input].label,
				style: {
					text: 'Slot ' + choices.inputSelect[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: 0
				},
				steps: [
					{
						down: [
							{
								actionId: 'sin',
								options: {
									p1: choices.inputSelect[input].id,
								}
							}
						],
						up: []
					}
				],
				feedbacks: [
					{
						feedbackId: 'input_slot',
						options: {
							fg1: combineRgb(255, 255, 255),
							bg1: combineRgb(255, 0, 0),
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
				type: 'button',
				category: 'Test Pattern (Basic)',
				name: 'Internal Test Pattern (General/Basic) ' + choices.tpatBasic[input].label,
				style: {
					text: 'ITP ' + choices.tpatBasic[input].label,
					size: '14',
					color: '16777215',
					bgcolor: 0
				},
				steps: [
					{
						down: [
							{
								actionId: 'itpBasic',
								options: {
									p1: choices.tpatBasic[input].id,
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Internal Test Pattern (Boxer) ######################

		// Internal Test Pattern (Boxer)
		for (let input in choices.tpatBoxer) {
			presets.push({
				type: 'button',
				category: 'Test Pattern (Boxer)',
				name: 'Internal Test Pattern (Boxer) ' + choices.tpatBoxer[input].label,
				style: {
					text: 'ITP ' + choices.tpatBoxer[input].label,
					size: '14',
					color: '16777215',
					bgcolor: 0
				},
				steps: [
					{
						down: [
							{
								actionId: 'itpBoxer',
								options: {
									p1: choices.tpatBoxer[input].id,
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Internal Test Pattern (M-Series) ######################

		// Internal Test Pattern (Boxer)
		for (let input in choices.tpatMser) {
			presets.push({
				type: 'button',
				category: 'Test Pattern (M-Series)',
				name: 'Internal Test Pattern (M-Series) ' + choices.tpatMser[input].label,
				style: {
					text: 'ITP ' + choices.tpatMser[input].label,
					size: '14',
					color: '16777215',
					bgcolor: 0
				},
				steps: [
					{
						down: [
							{
								actionId: 'itpMser',
								options: {
									p1: choices.tpatMser[input].id,
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Picture-In-Picture ######################

		// PIP ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				type: 'button',
				category: 'PIP',
				name: 'Picture In Picture ' + choices.OnOff[input].label,
				style: {
					text: 'PIP ' + choices.OnOff[input].label + ' $(ChristiePj:pip_enabled)',
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'pip',
								options: {
									p1: choices.OnOff[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: [
					{
						feedbackId: 'pip_enabled',
						options: {
							fg1: combineRgb(255, 255, 255),
							bg1: combineRgb(255, 0, 0),
							bg2: combineRgb(0, 204, 0),
						}
					}
				]
			});
		}

		// PIP Swap
		presets.push({
			type: 'button',
			category: 'PIP',
			name: 'Picture In Picture Swap',
			style: {
				style: 'text',
				text: 'PIP Swap',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'pps',
							options: {}
						}
					],
					up: []
				}
			],
			feedbacks: []
		});

		// PIP Preset
		for (let input in choices.pipPreset) {
			presets.push({
				type: 'button',
				category: 'PIP',
				name: 'Picture In Picture Preset' + choices.pipPreset[input].label,
				style: {
					text: 'PIP ' + choices.pipPreset[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'ppp',
								options: {
									p1: choices.pipPreset[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Key Pad ######################

		// Keypad Enable
		for (let input in choices.keypadEnableP1) {
			for (let input2 in choices.keypadEnableP2) {
				presets.push({
					type: 'button',
					category: 'Keypad ' + choices.keypadEnableP1[input].label,
					name: choices.keypadEnableP1[input].label + ' ' + choices.keypadEnableP2[input2].label,
					style: {
							text: choices.keypadEnableP1[input].label + ' ' + choices.keypadEnableP2[input2].label,
						size: 'auto',
						color: '16777215',
						bgcolor: combineRgb(0, 0, 0)
					},
					steps: [
						{
							down: [
								{
									actionId: 'ken',
									options: {
										p1: choices.keypadEnableP1[input].id,
										p2: choices.keypadEnableP2[input2].id
									}
								}
							],
							up: []
						}
					],
					feedbacks: []
				});
			}
		}

		// ###################### Key Codes ######################

		// Key Code
		for (let input in choices.keyCode) {
			presets.push({
				type: 'button',
				category: 'Key Codes',
				name: 'Key Code:' + choices.keyCode[input].label,
				style: {
					text: 'KEY: ' + choices.keyCode[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'key',
								options: {
									p1: choices.keyCode[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Language ######################

		// Set Language
		for (let input in choices.language) {
			presets.push({
				type: 'button',
				category: 'Language',
				name: 'Set Language:' + choices.language[input].label,
				style: {
					text: 'LNG: ' + choices.language[input].label,
					size: '18',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'lng',
								options: {
									p1: choices.language[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// ###################### Commands ######################

			// Auto Setup
			presets.push({
				type: 'button',
				category: 'Commands',
				name: 'Auto Setup',
				style: {
					text: 'Auto Setup',
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'asu',
								options: {}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});

		// Auto Power Up ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				type: 'button',
				category: 'Commands',
				name: 'Auto Power Up ' + choices.OnOff[input].label,
				style: {
					text: 'Auto PWR ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'apw',
								options: {
									p1: choices.OnOff[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Power ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				type: 'button',
				category: 'Commands',
				name: 'Power ' + choices.OnOff[input].label,
				style: {
					text: 'PWR ' + choices.OnOff[input].label +' $(ChristiePj:power_state)',
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'pwr',
								options: {
									p1: choices.OnOff[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: [
					{
						feedbackId: 'power_state',
						options: {
							fg1: combineRgb(255, 255, 255),
							fg2: combineRgb(0, 0, 0),
							bg1: combineRgb(0, 204, 0),
							bg2: combineRgb(255, 0, 0),
							bg3: combineRgb(255, 255, 0),
							bg4: combineRgb(255, 255, 0),
							bg5: combineRgb(255, 255, 0),
						}
					}
				]
			});
		}

		// Shutter Open / Close
		for (let input in choices.shutter) {
			presets.push({
				type: 'button',
				category: 'Commands',
				name: 'Shutter ' + choices.shutter[input].label,
				style: {
					text: 'Shutter ' + choices.shutter[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'shu',
								options: {
									p1: choices.shutter[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: [
					{
						feedbackId: 'shutter_closed',
						options: {
							fg1: combineRgb(255, 255, 255),
							bg1: combineRgb(255, 0, 0),
							bg2: combineRgb(0, 204, 0),
						}
					}
				]
			});
		}

		// OSD ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				type: 'button',
				category: 'Commands',
				name: 'On Screen Display ' + choices.OnOff[input].label,
				style: {
					text: 'OSD ' + choices.OnOff[input].label + ' $(ChristiePj:osd_enabled)',
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'osd',
								options: {
									p1: choices.OnOff[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: [
					{
						feedbackId: 'osd_enabled',
						options: {
							fg1: combineRgb(255, 255, 255),
							bg1: combineRgb(255, 0, 0),
							bg2: combineRgb(0, 204, 0),
						}
					}
				]
			});
		}

		// Source Dialog Enable ON / OFF
		for (let input in choices.OnOff) {
			presets.push({
				type: 'button',
				category: 'Commands',
				name: 'Source Dialog Enable ' + choices.OnOff[input].label,
				style: {
					text: 'Source Dia En. ' + choices.OnOff[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'sde',
								options: {
									p1: choices.OnOff[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Error Message Enable
		for (let input in choices.errorEnable) {
			presets.push({
				type: 'button',
				category: 'Commands',
				name: 'Error Message Enable ' + choices.errorEnable[input].label,
				style: {
					text: 'ERR MSG: ' + choices.errorEnable[input].label,
					size: 'auto',
					color: '16777215',
					bgcolor: combineRgb(0, 0, 0)
				},
				steps: [
					{
						down: [
							{
								actionId: 'eme',
								options: {
									p1: choices.errorEnable[input].id
								}
							}
						],
						up: []
					}
				],
				feedbacks: []
			});
		}

		// Get Lamp ON Time
		presets.push({
			type: 'button',
			category: 'Commands',
			name: 'Get Lamp ON Time',
			style: {
				style: 'text',
				text: 'Get Lamp Time',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lph',
							options: {}
						}
					],
					up: []
				}
			],
			feedbacks: []
		});

		// Factory Defaults
		presets.push({
			type: 'button',
			category: 'Commands',
			name: 'Factory Defaults',
			style: {
				style: 'text',
				text: 'Factory Reset',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'def',
							options: {
								p1: '111'
							}

						}
					],
					up: []
				}
			],
			feedbacks: []
		});

		// ###################### Status ######################

		// Power State
		presets.push({
			type: 'button',
			category: 'Status',
			name: 'Show Power State',
			style: {
				style: 'text',
				text: 'PWR: $(ChristiePj:power_state)',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'power_state',
					options: {
						fg1: combineRgb(255, 255, 255),
						fg2: combineRgb(0, 0, 0),
						bg1: combineRgb(0, 204, 0),
						bg2: combineRgb(255, 0, 0),
						bg3: combineRgb(255, 255, 0),
						bg4: combineRgb(255, 255, 0),
						bg5: combineRgb(255, 255, 0),
					}
				}
			]
		});

		// Standby State
		presets.push({
			type: 'button',
			category: 'Status',
			name: 'Show Standby State',
			style: {
				style: 'text',
				text: 'STB: $(ChristiePj:standby)',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'standby_state',
					options: {
						fg1: combineRgb(255, 255, 255),
						bg1: combineRgb(255, 0, 0),
						bg2: combineRgb(0, 204, 0),
					}
				}
			]
		});

		// Signal present
		presets.push({
			type: 'button',
			category: 'Status',
			name: 'Show Signal Status',
			style: {
				style: 'text',
				text: 'Signal: $(ChristiePj:signal_state)',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'signal_state',
					options: {
						fg1: combineRgb(255, 255, 255),
						fg2: combineRgb(0, 0, 0),
						bg1: combineRgb(0, 204, 0),
						bg2: combineRgb(255, 0, 0),
						bg3: combineRgb(255, 255, 0),
					}
				}
			]
		});

		// Shutter State
		presets.push({
			type: 'button',
			category: 'Status',
			name: 'Show Shutter Status',
			style: {
				style: 'text',
				text: 'Shutter: $(ChristiePj:shutter_closed)',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'shutter_closed',
					options: {
						fg1: combineRgb(255, 255, 255),
						bg1: combineRgb(255, 0, 0),
						bg2: combineRgb(0, 204, 0),
					}
				}
			]
		});

		// OSD State
		presets.push({
			type: 'button',
			category: 'Status',
			name: 'Show On Screen Display Status',
			style: {
				style: 'text',
				text: 'OSD: $(ChristiePj:osd_state)',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'osd_enabled',
					options: {
						fg1: combineRgb(255, 255, 255),
						bg1: combineRgb(255, 0, 0),
						bg2: combineRgb(0, 204, 0),
					}
				}
			]
		});

		// PIP State
		presets.push({
			type: 'button',
			category: 'Status',
			name: 'Show Picture In Picture Status',
			style: {
				style: 'text',
				text: 'PIP: $(ChristiePj:osd_state)',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'pip_state',
					options: {
						fg1: combineRgb(255, 255, 255),
						bg1: combineRgb(255, 0, 0),
						bg2: combineRgb(0, 204, 0),
					}
				}
			]
		});

		// Input Channel
		presets.push({
			type: 'button',
			category: 'Status',
			name: 'Show Input Channel',
			style: {
				style: 'text',
				text: 'CH: $(ChristiePj:input_channel)',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [],
			feedbacks: []
		});

		// Input Slot
		presets.push({
			type: 'button',
			category: 'Status',
			name: 'Show Input Slot',
			style: {
				style: 'text',
				text: 'Slot: $(ChristiePj:input_slot)',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [],
			feedbacks: []
		});

		// Lamp 1 ON Time
		presets.push({
			type: 'button',
			category: 'Status',
			name: 'Show Lamp 1 ON Time',
			style: {
				style: 'text',
				text: 'Lamp 1: $(ChristiePj:lamp_1)',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lph',
							options: {}
						}
					],
					up: []
				}
			],
			feedbacks: []
		});

		// Lamp 2 ON Time
		presets.push({
			type: 'button',
			category: 'Status',
			name: 'Show Lamp 2 ON Time',
			style: {
				style: 'text',
				text: 'Lamp 2: $(ChristiePj:lamp_2)',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lph',
							options: {}
						}
					],
					up: []
				}
			],
			feedbacks: []
		});

		//**************LENS SHIFT CONTROLS ***********
		presets.push({
			type: 'button',
			category: 'Lens Shift',
			name: 'LEFT',
			style: {
				style: 'png',
				text: '',
				png64: self.ICON_LEFT,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lensshift_move_h_pos',
							options: {},
						}
					],
					up: [
						{
							actionId: 'lensshift_move_h_stop',
							options: {},
						}
					]
				}
			],
			feedbacks: []
		})

		presets.push({
			type: 'button',
			category: 'Lens Shift',
			name: 'RIGHT',
			style: {
				style: 'png',
				text: '',
				png64: self.ICON_RIGHT,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lensshift_move_h_neg',
							options: {},
						}
					],
					up: [
						{
							actionId: 'lensshift_move_h_stop',
							options: {},
						}
					]
				}
			],
			feedbacks: []
		})

		presets.push({
			type: 'button',
			category: 'Lens Shift',
			name: 'UP',
			style: {
				style: 'png',
				text: '',
				png64: self.ICON_UP,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lensshift_move_v_neg',
							options: {},
						}
					],
					up: [
						{
							actionId: 'lensshift_move_v_stop',
							options: {},
						}
					]
				}
			],
			feedbacks: []
		})

		presets.push({
			type: 'button',
			category: 'Lens Shift',
			name: 'DOWN',
			style: {
				style: 'png',
				text: '',
				png64: self.ICON_DOWN,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lensshift_move_v_pos',
							options: {},
						}
					],
					up: [
						{
							actionId: 'lensshift_move_v_stop',
							options: {},
						}
					]
				}
			],
			feedbacks: []
		})

		presets.push({
			type: 'button',
			category: 'Lens Shift',
			name: 'Focus -',
			style: {
				style: 'png',
				text: 'F-',
				size: '18',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lensshift_focus_neg',
							options: {},
						}
					],
					up: [
						{
							actionId: 'lensshift_focus_stop',
							options: {},
						}
					]
				}
			],
			feedbacks: []
		})

		presets.push({
			type: 'button',
			category: 'Lens Shift',
			name: 'Focus +',
			style: {
				style: 'png',
				text: 'F+',
				size: '18',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lensshift_focus_pos',
							options: {},
						}
					],
					up: [
						{
							actionId: 'lensshift_focus_stop',
							options: {},
						}
					]
				}
			],
			feedbacks: []
		})

		presets.push({
			type: 'button',
			category: 'Lens Shift',
			name: 'Zoom -',
			style: {
				style: 'png',
				text: 'Z-',
				size: '18',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lensshift_zoom_neg',
							options: {},
						}
					],
					up: [
						{
							actionId: 'lensshift_zoom_stop',
							options: {},
						}
					]
				}
			],
			feedbacks: []
		})

		presets.push({
			type: 'button',
			category: 'Lens Shift',
			name: 'Zoom +',
			style: {
				style: 'png',
				text: 'Z+',
				size: '18',
				color: '16777215',
				bgcolor: combineRgb(0, 0, 0)
			},
			steps: [
				{
					down: [
						{
							actionId: 'lensshift_zoom_pos',
							options: {},
						}
					],
					up: [
						{
							actionId: 'lensshift_zoom_stop',
							options: {},
						}
					]
				}
			],
			feedbacks: []
		})
	
		self.setPresetDefinitions(presets);
	}
}