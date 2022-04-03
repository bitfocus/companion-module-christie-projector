
module.exports = {
	OnOff: [
		{ label: 'OFF', id: '0' },
		{ label: 'ON', id: '1' }
	],

	EnableDisable: [
		{ label: 'Disable', id: '0' },
		{ label: 'Enable', id: '1' }
	],

	shutter: [
		{ label: 'Open', id: '0' },
		{ label: 'Close', id: '1' }
	],

	colorProfile: [
		{ label: 'Max Drives (Default)', id: '0' },
		{ label: 'Color Temperature', id: '1' },
		{ label: 'SD Video', id: '2' },
		{ label: 'HD Video', id: '3' },
		{ label: 'User 1', id: '4' },
		{ label: 'User 2', id: '5' },
		{ label: 'User 3', id: '6' },
		{ label: 'User 4', id: '7' }
	],

	colorName: [
		{ label: 'Red',	id: '1' },
		{ label: 'Green', id: '2' },
		{ label: 'Blue', id: '3' },
		{ label: 'Yellow', id: '4' },
		{ label: 'Cyan', id: '5' },
		{ label: 'Magenta', id: '6' },
		{ label: 'White', id: '7' },
		{ label: 'Black', id: '8' }
	],

	colorSpace: [
		{ label: 'RGB', id: '0' },
		{ label: 'YPbPr (SDTV)', id: '1' },
		{ label: 'YPbPr (HDTV)', id: '2' }
	],

	errorEnable: [
		{ label: 'Off', id: '0' },
		{ label: 'On-Screen display', id: '1' },
		{ label: 'ASCII message', id: '2' },
		{ label: 'Both', id: '3' },
		{ label: 'All except error 1E & F', id: '4' }
	],

	inputFilter: [
		{ label: 'Off', id: '0' },
		{ label: 'HDTV', id: '1' },
		{ label: 'SDTV', id: '2' },
		{ label: 'EDTV', id: '3' },
		{ label: 'Graphics/RGB', id: '4' }
	],

	imageOpti: [
		{ label: 'Best Image Quality', id: '0' },
		{ label: 'Smooth Switching', id: '1' },
		{ label: 'Seamless Switching', id: '2' }
	],

	tpatBasic: [
		{ label: 'Off', id: '0' },
		{ label: 'Grid', id: '1' },
		{ label: 'Grey Scale 16', id: '2' },
		{ label: 'White', id: '3' },
		{ label: 'Flat Grey', id: '4' },
		{ label: 'Black', id: '5' },
		{ label: 'Checker', id: '6' },
		{ label: '13 Point', id: '7' },
		{ label: 'Color Bars', id: '8' },
		{ label: 'RGBW Gray Scale', id: '9' },
		{ label: 'Multi Color', id: '10'},
		{ label: 'Edge Blend', id: '11'},
		{ label: 'Aspect Ratio', id: '12'},
		{ label: 'Red & Blue Ramp', id: '13'},
		{ label: 'Calibration Line Ramp', id: '14'},
		{ label: 'Calibration Black & White Grid', id: '15'},
		{ label: 'Calibration White & Red Grid', id: '16'},
		{ label: 'Calibration White & Green Grid', id: '17'},
		{ label: 'Calibration White & Blue Grid', id: '18'}
	],

	tpatBoxer: [
		{ label: 'Off', id: '0' },
		{ label: 'Grid', id: '1' },
		{ label: 'Grey Scale 16', id: '2' },
		{ label: 'Flat White', id: '3' },
		{ label: 'Flat Grey', id: '4' },
		{ label: 'Flat Black', id: '5' },
		{ label: 'Checker', id: '6' },
		{ label: '17 Point', id: '7' },
		{ label: 'Edge Blend', id: '8' },
		{ label: 'Color Bars', id: '9' },
		{ label: 'Multi Color', id: '10'},
		{ label: 'RGBW Ramp', id: '11'},
		{ label: 'Horizontal Ramp', id: '12'},
		{ label: 'Vertical Ramp', id: '13'},
		{ label: 'Diagonal Ramp', id: '14'},
		{ label: 'Square Grid', id: '15'},
		{ label: 'Diagonal Grid', id: '16'},
		{ label: 'Maximum Activity', id: '17'},
		{ label: 'Prism/Convergence',id: '18'},
		{ label: 'Boresight', id: '21'},
		{ label: 'Convergence', id: '22'},
		{ label: 'Integrator Rod', id: '23'},
		{ label: 'Resolution Demo', id: '25'}
	],

	tpatMser: [
		{ label: 'Off', id: '0' },
		{ label: 'Grid', id: '1' },
		{ label: 'Grey Scale 16', id: '2' },
		{ label: 'White', id: '3' },
		{ label: 'Flat Grey', id: '4' },
		{ label: 'Black', id: '5' },
		{ label: 'Checker', id: '6' },
		{ label: '13 Point', id: '7' },
		{ label: 'Color Bars', id: '8' },
		{ label: 'Aspect Ratio', id: '11'},
		{ label: 'Edge Blend', id: '12'},
		{ label: 'Boresight', id: '14'}
	],

	keypadEnableP1: [
		{ label: 'Wired', id: '0' },
		{ label: 'IR Front', id: '1' },
		{ label: 'IR Back', id: '2' }
	],

	keypadEnableP2: [
		{ label: 'Off', id: '0' },
		{ label: 'Protocol Any', id: '1' },
		{ label: 'Protocol A', id: '10'},
		{ label: 'Protocol B', id: '11'},
		{ label: 'Protocol C', id: '12'},
		{ label: 'Protocol D', id: '13'},
		{ label: 'Protocol E', id: '14'},
		{ label: 'Protocol F', id: '15'},
		{ label: 'Protocol G', id: '16'}
	],

	keyCode: [
		{ label: '0', id: '0' },
		{ label: '1', id: '1' },
		{ label: '2', id: '2' },
		{ label: '3', id: '3' },
		{ label: '4', id: '4' },
		{ label: '5', id: '5' },
		{ label: '6', id: '6' },
		{ label: '7', id: '7' },
		{ label: '8', id: '8' },
		{ label: '9', id: '9' },
		{ label: 'Shift', id: '12' },
		{ label: 'Enter', id: '13' },
		{ label: 'Func', id: '14' },
		{ label: 'Proj', id: '22' },
		{ label: 'Exit', id: '27' },
		{ label: 'Cont', id: '41' },
		{ label: 'Menu', id: '44' },
		{ label: 'Power', id: '46' },
		{ label: 'OSD', id: '47' },
		{ label: 'Up (On)', id: '58' },
		{ label: 'Down (Off)', id: '59' },
		{ label: 'Left (-)', id: '60' },
		{ label: 'Lamp', id: '61' },
		{ label: 'Right (+)', id: '62' },
		{ label: 'Help', id: '63' },
		{ label: 'Input', id: '64' },
		{ label: 'Input 1 / BNC', id: '65' },
		{ label: 'Input 2 / DVI', id: '66' },
		{ label: 'Input 3 / VID', id: '67' },
		{ label: 'Input 4 / S-Vid',	id: '68' },
		{ label: 'Input 5 / Opt-1',	id: '69' },
		{ label: 'Input 6 / Opt-2',	id: '70' },
		{ label: 'Zoom IN',	 id: '71' },
		{ label: 'Zoom Out', id: '72' },
		{ label: 'Focus IN', id: '73' },
		{ label: 'Focus Out', id: '74' },
		{ label: 'Lens H Right', id: '75' },
		{ label: 'Lens H Left',	 id: '76' },
		{ label: 'Lens V Up', id: '77' },
		{ label: 'Lens V Down',	 id: '78' },
		{ label: 'Bright', id: '80' },
		{ label: 'Channel', id: '81' },
		{ label: 'Test', id: '82' },
		{ label: 'Shutter', id: '83' },
		{ label: 'PIP', id: '84' },
		{ label: 'Gamma', id: '85' },
		{ label: 'Auto', id: '86' },
		{ label: 'Focus', id: '87' },
		{ label: 'Zoom', id: '88' },
		{ label: 'Swap', id: '89' }
	],

	lensCal: [
		{ label: 'Relative', id: '0' },
		{ label: 'Manual', id: '1' },
		{ label: 'Calibrate', id: '2' }
	],

	language: [
		{ label: 'English', id: '1' },
		{ label: 'French', id: '2' },
		{ label: 'Spanish', id: '3' },
		{ label: 'German', id: '4' },
		{ label: 'Italian', id: '5' }
	],

	lampOp: [
		{ label: 'Lamp 1 only', id: '1' },
		{ label: 'Lamp 2 only', id: '2' },
		{ label: 'Both', id: '3' }
	],

	lampMode: [
		{ label: 'max brightness', id: '0' },
		{ label: 'maintain intensity setting', id: '1' },
		{ label: 'maintain power setting', id: '2' }
	],

	lampMode: [
		{ label: 'Auto', id: '0' },
		{ label: 'Still', id: '1' },
		{ label: 'Motion', id: '2' },
		{ label: 'Film', id: '3' }
	],

	pipPreset: [
		{ label: 'Top Left', id: '0' },
		{ label: 'Top Right', id: '1' },
		{ label: 'Bottom Left', id: '2' },
		{ label: 'Bottom Right', id: '3' },
		{ label: 'Custom', id: '4' }
	],

	inputSelect: [
		{ label: 'BNC', id: '1' },
		{ label: 'DVI-I', id: '2' },
		{ label: 'Composite', id: '3' },
		{ label: 'S-Video', id: '4' },
		{ label: 'Option slot #1', id: '5' },
		{ label: 'Option slot #2', id: '6' },
		{ label: 'Option slot #3', id: '7' },
		{ label: 'Option slot #4', id: '8' }
	],

	selectOri: [
		{ label: 'Front Projection', id: '0' },
		{ label: 'Rear Projection', id: '1' },
		{ label: 'Front Projection Inverted', id: '2' },
		{ label: 'Rear Projection Inverted', id: '3' }
	],

	videoStandard: [
		{ label: 'PAL', id: '0' },
		{ label: 'NTSC', id: '1' },
		{ label: 'SECAM', id: '2' },
		{ label: 'NTSC4.43', id: '3' },
		{ label: 'PAL-M', id: '4' },
		{ label: 'PAL-NC', id: '5' },
		{ label: 'PAL-60', id: '6' },
		{ label: 'NTSC', id: '7' },
		{ label: 'Auto-select',	id: '8' }
	],

	size: [
		{ label: 'Default', id: '0' },
		{ label: 'No Resizing', id: '1' },
		{ label: 'Full Screen', id: '2' },
		{ label: 'Full Width', id: '3' },
		{ label: 'Full Height', id: '4' },
		{ label: 'Anamorphic', id: '5' },
		{ label: 'Custom resizing',	id: '6' }
	],

	warpSelBasic: [
		{ label: 'Off', id: '0' },
		{ label: '2D Warp', id: '1' },
		{ label: 'User 1', id: '2' },
		{ label: 'User 2', id: '3' },
		{ label: 'User 3', id: '4' }
	],

	warpSelMseries: [
		{ label: 'Off', id: '0' },
		{ label: 'Mseries 2D Warp, Boxer User 1', id: '1' },
		{ label: 'Mseries User 1, Boxer User 2', id: '2' },
		{ label: 'Mseries User 2, Boxer User 3', id: '3' },
		{ label: 'Mseries User 3, Boxer User 4', id: '4' },
		{ label: 'Mseries User 4', id: '5' },
		{ label: 'Mseries User 5', id: '6' },
		{ label: 'Mseries User 6', id: '7' },
		{ label: 'Mseries User 7', id: '8' },
		{ label: 'Mseries User 8', id: '9' },
		{ label: 'Mseries User 9', id: '10' },
		{ label: 'Mseries User 10, Boxer Keystone', id: '11' },
		{ label: 'Mseries User 11', id: '12' },
		{ label: 'Mseries User 12', id: '13' },
		{ label: 'Mseries User 13', id: '14' },
		{ label: 'Mseries User 14', id: '15' },
		{ label: 'Mseries User 15', id: '16' },
		{ label: 'Mseries User 16', id: '17' }
	]
}