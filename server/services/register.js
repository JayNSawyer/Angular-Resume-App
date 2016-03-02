var mongoose = require('mongoose');
var User = require('../models/user');
var Hasher = require('../authentication/hash');

var register = {
	createUser: function(body){
		var salt;
		var hash;

		salt = Hasher.setSalt();
		hash = Hasher.createHash(body.password, salt);

		var user = new User();

		user.firstname = body.firstname;
		user.lastname = body.lastname;
		user.email = body.email;
		user.username = body.username;
		user.salt = salt;
		user.passwordHash = hash;

		return user;
	}
};

module.exports = register;

