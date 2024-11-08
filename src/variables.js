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

		//signal variables
		//signal_state, input_frequency, sync_width, sync_type, signal_type, pixel_rate, pip_signal_state, pip_input_frequency, pip_sync_width, pip_sync_type, pip_signal_type, pip_pixel_rate
		variables.push({ name: 'Signal State', variableId: 'signal_state' });
		variables.push({ name: 'Input Frequency', variableId: 'input_frequency' });
		variables.push({ name: 'Sync Width', variableId: 'sync_width' });
		variables.push({ name: 'Sync Type', variableId: 'sync_type' });
		variables.push({ name: 'Signal Type', variableId: 'signal_type' });
		variables.push({ name: 'Pixel Rate', variableId: 'pixel_rate' });
		variables.push({ name: 'PIP Signal State', variableId: 'pip_signal_state' });
		variables.push({ name: 'PIP Input Frequency', variableId: 'pip_input_frequency' });
		variables.push({ name: 'PIP Sync Width', variableId: 'pip_sync_width' });
		variables.push({ name: 'PIP Sync Type', variableId: 'pip_sync_type' });
		variables.push({ name: 'PIP Signal Type', variableId: 'pip_signal_type' });
		variables.push({ name: 'PIP Pixel Rate', variableId: 'pip_pixel_rate' });

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

			variableObj.signal_state = self.signal_state;
			variableObj.input_frequency = self.input_frequency;
			variableObj.sync_width = self.sync_width;
			variableObj.sync_type = self.sync_type;
			variableObj.signal_type = self.signal_type;
			variableObj.pixel_rate = self.pixel_rate;
			variableObj.pip_signal_state = self.pip_signal_state;
			variableObj.pip_input_frequency = self.pip_input_frequency;
			variableObj.pip_sync_width = self.pip_sync_width;
			variableObj.pip_sync_type = self.pip_sync_type;
			variableObj.pip_signal_type = self.pip_signal_type;
			variableObj.pip_pixel_rate = self.pip_pixel_rate;

			self.setVariableValues(variableObj);
		}
		catch(error) {
			self.log('error', 'Error setting Variables: ' + String(error));
		}
	}
}