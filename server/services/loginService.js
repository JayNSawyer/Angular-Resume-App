'use strict';

let passport = require('passport');
let Promise = require('bluebird');

function verifyCredentials(req, res, next) {

	return new Promise((resolve, reject) => {

		passport.authenticate('local-login', (error, token) => {
			if (error) {
				reject(error);
			}
			if (token) {
				resolve(token);
			}
		})(req, res, next);

	});
}

let LoginService = {
	verifyCredentials: verifyCredentials
};

module.exports = LoginService;

