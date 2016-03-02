'use strict';

var passport = require('passport');


var LoginController = (function () {

	function login(req, res, next) {

		passport.authenticate('local-login', function (error, user) {
			if (error) next(error);

			if (user) {
				return res.json({
					token: user.generateAuthToken()
				});
			} else {
				return res.status(401).json({
					message: 'No user found or your password is incorrect'
				});
			}
		})(req, res, next);

	}


	return {
		login: login
	};
	
}());


module.exports = LoginController;