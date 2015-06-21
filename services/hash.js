var crypto = require('crypto');


var Hasher = {
	setSalt: function(bytesParam){
		var salt;
		var bytes = '';
		if(bytesParam == null){
			bytes = 128;
		} else {
			bytes = bytesParam;
		}
		salt = crypto.randomBytes(bytes).toString('base64');
		return salt;
	},
	setHash: function(password, salt){
		var hmac = crypto.createHmac('sha1', salt);
		var hash = hmac.update(password).digest('hex');
		return hash;
	},
	getHash: function(password, salt){
		return this.setHash(password, salt);
	}
};


module.exports = Hasher;