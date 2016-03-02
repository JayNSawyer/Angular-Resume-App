var crypto = require('crypto');

//TODO: promisfy these functions!
var Hasher = {
	setSalt: function(bytesParam){
		if (bytesParam == null){
			bytes = 16;
		} else {
			bytes = bytesParam;
		}
		var salt = crypto.randomBytes(bytes).toString('hex');
		return salt;
	},
	createHash: function(passwordParam, salt){
		if(!passwordParam || !salt){
			return false;
		} else {
			var hmac = crypto.createHmac('sha1', salt);
			var hash = hmac.update(passwordParam).digest('hex');
			return hash;
		}
	},
	getHash: function(password, salt){
		return this.setHash(password, salt);
	}
};


module.exports = Hasher;