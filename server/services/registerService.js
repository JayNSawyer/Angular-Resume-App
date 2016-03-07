'use strict';

let passport = require('passport');
let Promise = require('bluebird');

let RegisterService = (() => {

	function registerUser(req, res, next) {

		return new Promise((resolve, reject) => {

			passport.authenticate('local-register', (error, user) => {
				if (error) {
					console.log('error in registerService: ' + error);
					reject(error);
				}
				if (user) {
					resolve(user);
				}
			})(req, res, next);

		});
	}

	return {
		registerUser: registerUser
	}

}());

module.exports = RegisterService;