const choices = require('./choices.js');
const util = require('./util.js');

module.exports = {
	// ##########################
	// #### Instance Actions ####
	// ##########################
	setActions: function () {
		let self = this;
		let actions = {};

		actions.alc = {
			label: 'Automatic Lens Calibration On / Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '0',
					choices: choices.OnOff
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(ALC ' + opt.p1 + ')';
				self.sendCommand(cmd);

			}
		}

		actions.apw = {
			label: 'Auto Power Up On / Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '0',
					choices: choices.OnOff
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(APW ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.aro = {
			label: 'Aspect Ratio Overlay / Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '0',
					choices: choices.OnOff
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(ARO ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.asr = {
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
					choices: choices.OnOff
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(ASR ' + util.pad2(opt.p1) + ' ' + opt.p2 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.asu = {
			label: 'Auto Setup',
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(ASU)';
				self.sendCommand(cmd);
			}
		}

		actions.brt = {
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
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(BRT ' + util.pad4(opt.p1) + ')';
				self.sendCommand(cmd);
			}
		}

		actions.ccs = {
			label: 'Select Output Color',
			options: [
				{
					type: 'dropdown',
					label: 'Select Color Profile',
					id: 'p1',
					default: '0',
					choices: choices.colorProfile
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(CCS ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.cha = {
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
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(CHA ' + util.pad2(opt.p1) + ')';
				self.sendCommand(cmd);
			}
		}

		actions.cle = {
			label: 'Color Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Select Color',
					id: 'p1',
					default: '8',
					choices: choices.colorName
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(CLE ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.clr = {
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
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(CLR ' + util.pad4(opt.p1) + ')';
				self.sendCommand(cmd);
			}
		}

		actions.con = {
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
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(CON ' + util.pad4(opt.p1) + ')';
				self.sendCommand(cmd);
			}
		}

		actions.csp = {
			label: 'Color Space',
			options: [
				{
					type: 'dropdown',
					label: 'Select Color Space',
					id: 'p1',
					default: '0',
					choices: choices.colorSpace
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(CSP ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.def = {
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
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(DEF ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.eme = {
			label: 'Error Message Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Select an Option',
					id: 'p1',
					default: '3',
					choices: choices.errorEnable
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(EME ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.fcs = {
			label: 'Focus (Fixed)',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Focus Set (-1200 to 1200)',
					min: -1200,
					max: 1200,
					default: 0,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				},
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(FCS ' + util.pad4(opt.p1) + ')';
				self.sendCommand(cmd);
			}
		}

		actions.fil = {
			label: 'Input Filter',
			options: [
				{
					type: 'dropdown',
					label: 'Select Filter Type',
					id: 'p1',
					default: '0',
					choices: choices.inputFilter
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(FIL ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.frz = {
			label: 'Freeze On / Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '0',
					choices: choices.OnOff
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(FRZ ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.gam = {
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
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(GAM ' + opt.p1 +')';
				self.sendCommand(cmd);
			}
		}

		actions.hor = {
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
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(HOR' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.ils = {
			label: 'Intelligent Lens System On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '1',
					choices: choices.OnOff
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(ILS ' + opt.p1 +')';
				self.sendCommand(cmd);
			}
		}

		actions.iop = {
			label: 'Image Optimization',
			options: [
				{
					type: 'dropdown',
					label: 'Select an Option',
					id: 'p1',
					default: '1',
					choices: choices.imageOpti
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(IOP ' + opt.p1 +')';
				self.sendCommand(cmd);
			}
		}

		actions.itpBasic = {
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
					choices: choices.tpatBasic
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(ITP ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.itpBoxer = {
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
					choices: choices.tpatBoxer
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(ITP ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.itpMser = {
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
					choices: choices.tpatMser
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(ITP ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.ken = {
			label: 'Keypad Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Select type',
					id: 'p1',
					default: '0',
					choices: choices.keypadEnableP1
				},
				{
					type: 'dropdown',
					label: 'Protocol',
					id: 'p2',
					default: '0',
					choices: choices.keypadEnableP2
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(KEN ' + opt.p1 + ' ' + opt.p2 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.key = {
			label: 'Key Code / Key Press',
			options: [
				{
					type: 'dropdown',
					label: 'Select Key',
					id: 'p1',
					default: '0',
					choices: choices.keyCode
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(KEY ' + opt.p1 + ')(KEY ' + (Number(opt.p1) + 128) + ')';
				self.sendCommand(cmd);
			}
		}

		actions.lcb = {
			label: 'Lens Calibrate',
			options: [
				{
					type: 'dropdown',
					label: 'Select type',
					id: 'p1',
					default: '0',
					choices: choices.lensCal
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(LCB ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.lcn = {
			label: 'Lens Center',
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(LCN)';
				self.sendCommand(cmd);
			}
		}

		actions.lco = {
			label: 'Lamp Conditioning On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '1',
					choices: choices.OnOff
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(LCO ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.lng = {
			label: 'Language',
			options: [
				{
					type: 'dropdown',
					label: 'Select Language',
					id: 'p1',
					default: '1',
					choices: choices.language
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(LNG ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.lop = {
			label: 'Lamp Operation',
			options: [
				{
					type: 'dropdown',
					label: 'Select Mode',
					id: 'p1',
					default: '3',
					choices: choices.lampOp
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(LOP ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.lpc = {
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
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(LPC ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.lph = {
			label: 'Lamp Hours Of Use?',
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(LPH?)';
				self.sendCommand(cmd);
			}
		}

		actions.lpi = {
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
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(LPI ' + util.pad4(opt.p1) +')';
				self.sendCommand(cmd);
			}
		}

		actions.lpm = {
			label: 'Lamp Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Select Mode',
					id: 'p1',
					default: '0',
					choices: choices.lampMode
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(LPM ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.mot = {
			label: 'Motion Filter',
			options: [
				{
					type: 'dropdown',
					label: 'Select Filter',
					id: 'p1',
					default: '0',
					choices: choices.motionFilter
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(MOT ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.osd = {
			label: 'On Screen Display On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '1',
					choices: choices.OnOff
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(OSD ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.pip = {
			label: 'Picture In Picture On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '1',
					choices: choices.OnOff
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(PIP ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.ppp = {
			label: 'PIP Position Preset',
			options: [
				{
					type: 'dropdown',
					label: 'Select Preset',
					id: 'p1',
					default: '0',
					choices: choices.pipPreset
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(PPP ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.pps = {
			label: 'Picture In Picture Swap',
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(PPS)';
				self.sendCommand(cmd);
			}
		}

		actions.pwr = {
			label: 'Power On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'p1',
					default: '1',
					choices: choices.OnOff
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(PWR ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.sde = {
			label: 'Source Dialog Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Show / Hide',
					id: 'p1',
					default: '1',
					choices: choices.EnableDisable
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(SDE ' + opt.p1 +')';
				self.sendCommand(cmd);
			}
		}

		actions.shu = {
			label: 'Shutter Open / Close',
			options: [
				{
					type: 'dropdown',
					label: 'Open / Close',
					id: 'p1',
					default: '0',
					choices: choices.shutter
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(SHU ' + util.pad3(opt.p1) +')';
				self.sendCommand(cmd);
			}
		}

		actions.sin = {
			label: 'Select Input',
			options: [
				{
					type: 'dropdown',
					label: 'Input:',
					id: 'p1',
					default: '1',
					choices: choices.inputSelect
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(SIN ' + opt.p1 +')';
				self.sendCommand(cmd);
			}
		}

		actions.sor = {
			label: 'Select Orientation',
			options: [
				{
					type: 'dropdown',
					label: 'Orientation:',
					id: 'p1',
					default: '0',
					choices: choices.selectOri
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(SOR ' + opt.p1 +')';
				self.sendCommand(cmd);
			}
		}

		actions.std = {
			label: 'Video Standard',
			options: [
				{
					type: 'dropdown',
					label: 'Video Standard',
					id: 'p1',
					default: '8',
					choices: choices.videoStandard
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(STD ' + opt.p1 +')';
				self.sendCommand(cmd);
			}
		}

		actions.szp = {
			label: 'Size Presets Position',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'p1',
					default: '0',
					choices: choices.size
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(SZP ' + opt.p1 +')';
				self.sendCommand(cmd);
			}
		}

		actions.tnt = {
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
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(TNT ' + opt.p1 +')';
				self.sendCommand(cmd);
			}
		}

		actions.vrt = {
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
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(VRT ' + opt.p1 +')';
				self.sendCommand(cmd);
			}
		}

		actions.wps = {
			label: 'Geometry Correction (General)',
			options: [
				{
					type: 'dropdown',
					label: 'Warp Select',
					id: 'p1',
					default: '0',
					choices: choices.warpSelBasic
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(WPS ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.wrp = {
			label: 'Geometry Correction (Mseries & Boxer)',
			options: [
				{
					type: 'dropdown',
					label: 'Warp Select',
					id: 'p1',
					default: '0',
					choices: choices.warpSelMseries
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(WRP+SLCT ' + opt.p1 + ')';
				self.sendCommand(cmd);
			}
		}

		actions.zom = {
			label: 'Zoom (Fixed)',
			options: [
				{
					type: 'number',
					id: 'p1',
					label: 'Zoom Set (-1200 to 1200)',
					min: -1200,
					max: 1200,
					default: 0,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				}
			],
			callback: function(action, bank) {
				let opt = action.options
				let cmd = '(ZOM ' + util.pad4(opt.p1) + ')';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_move_h_neg = {
			label: 'Lens Shift - Start to Move Horizontal Motor to Negative Max',
			callback: function(action, bank) {
				let cmd = '(LMV+HRUN-1)';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_move_h_pos = {
			label: 'Lens Shift - Start to Move Horizontal Motor to Positive Max',
			callback: function(action, bank) {
				let cmd = '(LMV+HRUN1)';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_move_h_stop = {
			label: 'Lens Shift - Stop Move Horizontal Motor',
			callback: function(action, bank) {
				let cmd = '(LMV+HRUN0)';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_move_h_number = {
			label: 'Lens Shift - Move Horizontal Motor to Position',
			options: [
				{
					type: 'number',
					id: 'pos',
					label: 'Position (-2050 to 2050)',
					min: -2050,
					max: 2050,
					default: 0,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				}
			],
			callback: function(action, bank) {
				let opt = action.options;
				let cmd = '(LHO ' + util.pad4(opt.pos) + ')';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_move_v_neg = {
			label: 'Lens Shift - Start to Move Vertical Motor to Negative Max',
			callback: function(action, bank) {
				let cmd = '(LMV+VRUN-1)';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_move_v_pos = {
			label: 'Lens Shift - Start to Move Vertical Motor to Positive Max',
			callback: function(action, bank) {
				let cmd = '(LMV+VRUN1)';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_move_v_stop = {
			label: 'Lens Shift - Stop Move Vertical Motor',
			callback: function(action, bank) {
				let cmd = '(LMV+VRUN0)';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_move_v_number = {
			label: 'Lens Shift - Move Vertical Motor to Position',
			options: [
				{
					type: 'number',
					id: 'pos',
					label: 'Position (-2050 to 2050)',
					min: -2050,
					max: 2050,
					default: 0,
					required: true,
					range: false,
					regex: self.REGEX_NUMBER
				}
			],
			callback: function(action, bank) {
				let opt = action.options;
				let cmd = '(LVO ' + util.pad4(opt.pos) + ')';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_focus_neg = {
			label: 'Lens Shift - Start to Move Focus Motor to Negative Max',
			callback: function(action, bank) {
				let cmd = '(LMV+FRUN-1)';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_focus_pos = {
			label: 'Lens Shift - Start to Move Focus Motor to Positive Max',
			callback: function(action, bank) {
				let cmd = '(LMV+FRUN1)';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_focus_stop = {
			label: 'Lens Shift - Stop Move Focus Motor',
			callback: function(action, bank) {
				let cmd = '(LMV+FRUN0)';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_zoom_neg = {
			label: 'Lens Shift - Start to Move Zoom Motor to Negative Max',
			callback: function(action, bank) {
				let cmd = '(LMV+ZRUN-1)';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_zoom_pos = {
			label: 'Lens Shift - Start to Move Zoom Motor to Positive Max',
			callback: function(action, bank) {
				let cmd = '(LMV+ZRUN1)';
				self.sendCommand(cmd);
			}
		}

		actions.lensshift_zoom_stop = {
			label: 'Lens Shift - Stop Move Zoom Motor',
			callback: function(action, bank) {
				let cmd = '(LMV+ZRUN0)';
				self.sendCommand(cmd);
			}
		}

		return actions
	}
}