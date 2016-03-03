'use strict';

var passport = require('passport');
var Promise = require('bluebird');


var LoginService = (function () {

	function verifyCredentials(req, res, next) {

		return new Promise(function (resolve, reject) {

			passport.authenticate('local-login', function (error, user) {
				if (error) {
					reject(error);
				}
				if (user) {
					resolve(user);
				}
			})(req, res, next);

		});
	}

	return {
		verifyCredentials: verifyCredentials
	};

}());


module.exports = LoginService;