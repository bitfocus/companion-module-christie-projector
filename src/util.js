const { InstanceStatus } = require('@companion-module/base')

module.exports = {
	pad2: function(num) {
		return this.padAmount(num, 2);
	},
	
	pad3: function(num) {
		return this.padAmount(num, 3);
	},
	
	pad4: function(num) {
		return this.padAmount(num, 4);
	},

	padAmount: function(num, amount) {
		let i = parseInt(num);
		let neg = false;

		if (i < 0) {
			neg = true;
		}

		i = Math.abs(i); //set to positive, remove the negative/- sign

		let s = i.toString().padStart(amount, '0');

		if (neg) {
			s = '-' + s;
		}

		return s;
	},

	clearWarning: function() {
		this.updateStatus(InstanceStatus.Ok);
	}
}