'use strict';

var User = require('../models/user');
var passport = require('passport');


var UserController = (function () {

	function create(req, res, next) {
		passport.authenticate('local-register', function (error, user) {
			if (error) next(error);

			if (user) {
				return res.json({
					token: user.generateAuthToken()
				});
			} else {
				return res.status(401).json({
					message: 'Registration failed!'
				});
			}
		})(req, res, next);
	}

	function index(req, res) {
		User.find()
			.execAsync()
			.then(function (users) {
				res.json(users);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	return {
		index: index,
		create: create
	};

}());


module.exports = UserController;