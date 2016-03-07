'use strict';

let User = require('../models/user');
let passport = require('passport');
let registerUser = require('../services/registerService')['registerUser'];

let UserController = (() => {

	function create(req, res, next) {
		registerUser(req, res, next)
			.then((token) => {
				return res.json({
					token:  token
				});
			})
			.catch((error) => {
				console.log('error in userController.create: ' + error);
				return res.status(401).json({
					message: error
				});
			});
	}


	function index(req, res) {
		User.find()
			.then((users) => { res.json(users) })
			.catch((error) => { console.log(error) });
	}

	return {
		index: index,
		create: create
	};

}());


module.exports = UserController;