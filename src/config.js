const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		let self = this;

		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls some Christie projectors.'
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'IP Address',
				width: 3,
				default: '192.168.0.1',
				regex: Regex.IP
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Port',
				width: 3,
				default: 3002,
				regex: Regex.Port
			},
			{
				type: 'static-text',
				id: 'intervalInfo',
				width: 12,
				label: 'Update Interval',
				value: 'Please enter the amount of time in milliseconds to request new information from the projector. Set to 0 to disable.',
			},
			{
				type: 'textinput',
				id: 'interval',
				label: 'Update Interval',
				width: 3,
				default: 5000
			},
			/*
			TODO this will be used to limit / selct the options acording to the projector series in use, need to find a event to trigger the assignments
			{
				type: 'dropdown',
				label: 'projector type',
				id: 'pjtype',
				width: 6,
				choices: [
					{ label: 'Boxer series', id: 'boxer' },
					{ label: 'M series', id: 'mseries' }
				]
			}
			*/
			{
				type: 'static-text',
				id: 'info2',
				label: 'Verbose Logging',
				width: 12,
				value: `
					<div class="alert alert-info">
						Enabling this option will put more detail in the log, which can be useful for troubleshooting purposes.
					</div>
				`
			},
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false
			},
		]
	}
}