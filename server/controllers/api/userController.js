'use strict';

let mongoose = require('mongoose');
let mongooseBird = require('mongoose-bird')(mongoose);
let User = require('../../models/user');


let UserController = (() => {
	function index(req, res) {
		User.find()
			.execAsync()
			.then((users) => { res.json(users) })
			.catch((error) => { console.log(error) });
	}
	return {
		index: index
	};
	
}());


module.exports = UserController;