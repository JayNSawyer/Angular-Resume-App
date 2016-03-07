'use strict';

let mongoose = require('mongoose');
let User = require('../models/user');
let HashService = require('../services/hashService');

function createUser(body) {
		var userSalt;

		return HashService.setSalt()
			.then((salt) => {
				userSalt = salt;
				return HashService.createHash(body.password, salt);
			})
			.then((hash) => {
				let user = new User();

				user.firstname = body.firstname;
				user.lastname = body.lastname;
				user.email = body.email;
				user.username = body.username;
				user.salt = userSalt;
				user.passwordHash = hash;

				return user;
			})
			.catch((error) => {
				console.log('error in createUserService: ' + error);
				return error;
			});
}

let CreateUserService = {
	createUser: createUser
};

module.exports = CreateUserService;

