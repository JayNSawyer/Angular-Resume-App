'use strict';

let LoginService = require('../services/loginService');

let LoginController = (() => {

	function login(req, res, next) {
		LoginService.verifyCredentials(req, res, next)
			.then((token) => {
				return res.json({
					token: token
				});
			})
			.catch((error) => {
				console.log(error);
				return res.status(401).json({
					error: 'Unable to login user!'
				});
			});
	}

	return {
		login: login
	};

}());


module.exports = LoginController;