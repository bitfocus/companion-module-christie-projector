module.exports = {
	initVariables: function () {
		let variables = [];

		variables.push({ name: 'Total Hours On Lamp 1', variableId: 'lamp_1' });
		variables.push({ name: 'Total Hours On Lamp 2', variableId: 'lamp_2' });	
		variables.push({ name: 'Power State', variableId: 'power_state' });
		variables.push({ name: 'Standby', variableId: 'standby' });	
		variables.push({ name: 'Signal State', variableId: 'signal_state' });	
		variables.push({ name: 'OSD Enabled', variableId: 'osd_enabled' });	
		variables.push({ name: 'Shutter State', variableId: 'shutter_closed' });	
		variables.push({ name: 'Input Channel', variableId: 'input_channel' });	
		variables.push({ name: 'Input Slot', variableId: 'input_slot' });	
		variables.push({ name: 'PIP Enabled', variableId: 'pip_enabled' });

		variables.push({ name: 'Motor Position - Horizontal', variableId: 'motorposition_h' });
		variables.push({ name: 'Motor Position - Vertical', variableId: 'motorposition_v' });
		variables.push({ name: 'Motor Position - Zoom', variableId: 'motorposition_z' });
		variables.push({ name: 'Motor Position - Focus', variableId: 'motorposition_f' });

		this.setVariableDefinitions(variables);
	},

	checkVariables: function () {
		let self = this;

		try {
			let variableObj = {};

			variableObj.lamp_1 = self.lamp_1;
			variableObj.lamp_2 = self.lamp_2;
			variableObj.power_state = self.power_state;
			variableObj.standby = self.standby;
			variableObj.signal_state = self.signal_state;
			variableObj.osd_enabled = self.osd_enabled;
			variableObj.shutter_closed = self.shutter_closed;
			variableObj.input_channel = self.input_channel;
			variableObj.input_slot = self.input_slot_label;
			variableObj.pip_enabled = self.pip_enabled;

			variableObj.motorposition_h = self.motorposition_h;
			variableObj.motorposition_v = self.motorposition_v;
			variableObj.motorposition_z = self.motorposition_z;
			variableObj.motorposition_f = self.motorposition_f;

			self.setVariableValues(variableObj);
		}
		catch(error) {
			self.log('error', 'Error setting Variables: ' + String(error));
		}
	}
}