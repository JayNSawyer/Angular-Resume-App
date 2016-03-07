'use strict';

let mongoose = require('mongoose');
let mongooseBird = require('mongoose-bird')(mongoose);
let User = require('../models/user');



let ApplicationController = (() => {

	function home(req, res) {
		res.render('index', {
			title: 'Express'
		});
	}

	return {
		home: home
	};

}());


module.exports = ApplicationController;