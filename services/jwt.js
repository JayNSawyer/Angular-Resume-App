var jwt = require('jsonwebtoken');
var moment = require('moment');
var secrets = require('../config/secrets.js');

var AuthToken = {
	generateAuthToken: function(obj){

		var expire;

		if(obj.days == null){
			expire = moment().add('days', 30).valueOf(); //default to 30 days
		} else {
			expire = moment().add('days', obj.days).valueOf();
		}

		return jwt.sign({
			_id: obj.id,
			username: obj.username,
			expiration: expire
		}, secrets.SECRET);
	}
};


module.exports = AuthToken;