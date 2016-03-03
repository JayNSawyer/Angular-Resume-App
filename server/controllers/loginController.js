'use strict';

var LoginService = require('../services/loginService');

var LoginController = (function () {

	function login(req, res, next) {
		LoginService.verifyCredentials(req, res, next)
			.then(function (user) {
				return response.json({
					token: user.generateAuthToken()
				});
			})
			.catch(function (error) {
				return response.status(401).json({
					error: 'Unable to login user!'
				});
			});
	}

	return {
		login: login
	};

}());


module.exports = LoginController;