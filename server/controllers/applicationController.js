'use strict';

var mongoose = require('mongoose');
var mongooseBird = require('mongoose-bird')(mongoose);
var User = require('../models/user');



var ApplicationController = (function () {

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