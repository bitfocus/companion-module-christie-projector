module.exports = {
	pad2: function(num) {
		let s = "00" + num;
		return s.substr(s.length-2);
	},
	
	pad3: function(num) {
		let s = "000" + num;
		return s.substr(s.length-3);
	},
	
	pad4: function(num) {
		let s = "0000" + num;
		return s.substr(s.length-4);
	}
}