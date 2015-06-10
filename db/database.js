var express = require('express');
var mongoose = require('mongoose');

var mongodb = mongoose.connect('mongodb://localhost/resumeApp');

var userModel = require('../models/userModel');
var Hasher = require('../helpers/hash');


var User = mongoose.model('User', userModel);

User.find({}).exec(function(error, collection){
	if(collection.length === 0){
		var salt;
		var hash;
		salt = Hasher.setSalt();
		hash = Hasher.setHash('timmy81', salt);
		User.create({firstname: 'Tim', lastname: 'Robbins', username: 'TimRobbins81', salt: salt, passwordHash: hash});
		salt = Hasher.setSalt();
		hash = Hasher.setHash('jimmy81', salt);
		User.create({firstname: 'Jimmy', lastname: 'Jones', username: 'Jimmy81', salt: salt, passwordHash: hash});
		salt = Hasher.setSalt();
		hash = Hasher.setHash('tommy81', salt);
		User.create({firstname: 'Tommy', lastname: 'Thompson', username: 'Tommy81', salt: salt, passwordHash: hash});
	}
});

var DB = {
	User: User
};

module.exports = DB;