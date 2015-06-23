var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
var moment = require('moment');
var secrets = require('../config/secrets.js');

var AuthToken = {
	generateAuthToken: function(obj){

		var expire;

		if(obj.days == 'default'){
			expire = moment().add('days', 30).valueOf(); //default to 30 days
		} else {
			expire = moment().add('days', obj.days).valueOf();
		}

		return jwt.sign({
			_id: obj.id,
			username: obj.username,
			expiration: expire
		}, secrets.SECRET);
	},
	getAuth: function(){
		var getAuth = expressJWT({secret: secrets.SECRET, userProperty: 'payload'});
		return getAuth;
	}
};


module.exports = AuthToken;