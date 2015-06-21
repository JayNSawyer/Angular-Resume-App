var jwt = require('jsonwebtoken');
var secrets = require('../config/secrets.js');

var AuthToken = {
	generateAuthToken: function(days, obj){

		var expirationDate = new Date();
		var numberOfDays;
		if(days == null){
			numberOfDays = 30; //default to 30 days
		} else {
			numberOfDays = days;
		}
		expirationDate.setDate(expirationDate.getDate() + numberOfDays);

		return jwt.sign({
			_id: obj.id,
			username: obj.username,
			expiration: Math.floor(exp.getTime() / 1000) //seconds since epoch
		}, secrets.SECRET);
	}
};


module.exports = AuthToken;