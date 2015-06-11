var jwt = require('jsonwebtoken');
var secrets = require('../config/secrets.json');

var AuthToken = {
	generateAuthToken: function(expiration, obj){
		var today = new Date();
		var exp = new Date(today);
		var expirationDate;
		if(expiration == null){
			expirationDate = 30; //default to 30 days
		} else {
			expirationDate = expiration;
		}
		exp.setDate(today.getDate() + expirationDate);

		return jwt.sign({
			_id: obj._id,
			username: obj.username,
			exp: parseInt(exp.getTime() / 1000)
		}, secrets.SECRET);
	};
};


module.exports = AuthToken;