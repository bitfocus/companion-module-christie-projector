var tcp = require('../../tcp');
var instance_skel = require('../../instance_skel');
var debug;
var log;

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

	debug = self.debug;
	log = self.log;

	self.status(1,'Connecting'); // status ok!

	self.init_tcp();
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

		self.socket.on('data', function (data) {});
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
			label: 'Target port',
			width: 4,
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

	debug("destroy", self.id);;
};

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

instance.prototype.colorName = [
	{ label: 'White',         id: '0' },
	{ label: 'Red',           id: '1' },
	{ label: 'Green',         id: '2' },
	{ label: 'Blue',          id: '3' },
	{ label: 'Yellow',        id: '4' },
	{ label: 'Cyan',          id: '5' },
	{ label: 'Magenta',       id: '6' }
];

instance.prototype.warpSel = [
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


instance.prototype.actions = function(system) {
	var self = this;

	self.system.emit('instance_actions', self.id, {
		'pwr': {
			label: 'Power On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'pwrId',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' }
					]
				}
			]
		},
		'shu': {
			label: 'Shutter Open / Close',
			options: [
				{
					type: 'dropdown',
					label: 'Open / Close',
					id: 'shuId',
					choices: [
						{ id: '0', label: 'Open' },
						{ id: '1', label: 'Close' }
					]
				}
			]
		},
		'frz': {
			label: 'Freeze On / Off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'frzId',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' }
				 ]
				}
			]
		},
		'itpBoxer': {
			label: 'Internal testpattern Boxer series',
			options: [
				{
					type: 'dropdown',
					label: 'Select Testpattern',
					id: 'itpId',
					choices: self.tpatBoxer
				}
			]
		},
		'itpMser': {
			label: 'Internal testpattern M series',
			options: [
				{
					type: 'dropdown',
					label: 'Select Testpattern',
					id: 'itpId',
					choices: self.tpatMser
				}
			]
		},
		'cle':  {
			label: 'Color Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Select Color',
					id: 'cleId',
					choices: self.colorName
				}
			]
		},
		'wrp':  {
			label: 'Geometry Correction',
			options: [
				{
					type: 'dropdown',
					label: 'Warp Select',
					id: 'warpSelId',
					choices: self.warpSel
				}
			]
		},


	});
};

instance.prototype.action = function(action) {
	var self = this;
	var opt = action.options
	var cmd

	switch (action.action) {

		case 'pwr':
			cmd = '(PWR ' + opt.pwrId + ')';
			break;

		case 'shu':
			cmd = '(SHU ' + opt.shuId +' )';
			break;

		case 'frz':
			cmd = '(FRZ ' + opt.frzId + ' )';
			break;

		case 'cle':
			cmd = '(CLE' + opt.cleId + ' )';
			break;

		case 'itpBoxer':
			cmd = '(ITP ' + opt.itpId + ' )';
			break;

		case 'itpMser':
			cmd = '(ITP ' + opt.itpId + ' )';
			break;

		case 'wrp':
			cmd = '(WRP+SLCT ' + opt.warpSelId + ' )';
			break;

		//TODO make input select need to fetch the available input configurations from the projector


	};




	if (cmd !== undefined) {

		debug('sending ',cmd,"to",self.config.host);

		if (self.socket !== undefined && self.socket.connected) {
			self.socket.send(cmd);
		}
		else {
			debug('Socket not connected :(');
		}

	}

	// debug('action():', action);

};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
