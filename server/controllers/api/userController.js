'use strict';

var mongoose = require('mongoose');
var mongooseBird = require('mongoose-bird')(mongoose);
var User = require('../../models/user');


var UserController = (function () {

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
		index: index
	};
	
}());


module.exports = UserController;