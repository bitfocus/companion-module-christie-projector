module.exports = {
	// ##########################
	// #### Define Variables ####
	// ##########################
	setVariables: function () {
		let self = this;
		let variables = [];

		variables.push({ label: 'Total Hours On Lamp 1', name: 'lamp_1' });
		variables.push({ label: 'Total Hours On Lamp 2', name: 'lamp_2' });	
		variables.push({ label: 'Power State', name: 'power_state' });
		variables.push({ label: 'Standby', name: 'standby' });	
		variables.push({ label: 'Signal State', name: 'signal_state' });	
		variables.push({ label: 'OSD Enabled', name: 'osd_enabled' });	
		variables.push({ label: 'Shutter State', name: 'shutter_closed' });	
		variables.push({ label: 'Input Channel', name: 'input_channel' });	
		variables.push({ label: 'Input Slot', name: 'input_slot' });	
		variables.push({ label: 'PIP Enabled', name: 'pip_enabled' });

		variables.push({ label: 'Motor Position - Horizontal', name: 'motorposition_h' });
		variables.push({ label: 'Motor Position - Vertical', name: 'motorposition_v' });
		variables.push({ label: 'Motor Position - Focus', name: 'motorposition_f' });
		variables.push({ label: 'Motor Position - Zoom', name: 'motorposition_z' });

		return variables
	},

	// #########################
	// #### Check Variables ####
	// #########################
	checkVariables: function () {
		let self = this;

		try {
			self.setVariable('lamp_1', self.lamp_1);
			self.setVariable('lamp_2', self.lamp_2);
			self.setVariable('power_state', self.power_state);
			self.setVariable('standby', self.standby);
			self.setVariable('signal_state', self.signal_state);
			self.setVariable('osd_enabled', self.osd_enabled);
			self.setVariable('shutter_closed', self.shutter_closed);
			self.setVariable('input_channel', self.input_channel);
			self.setVariable('input_slot', self.input_slot_label);
			self.setVariable('pip_enabled', self.pip_enabled);

			self.setVariable('motorposition_h', self.motorposition_h);
			self.setVariable('motorposition_v', self.motorposition_v);
			self.setVariable('motorposition_f', self.motorposition_f);
			self.setVariable('motorposition_z', self.motorposition_z);
		}
		catch(error) {
			self.log('error', 'Error setting Variables from Device: ' + String(error));
		}
	}
}