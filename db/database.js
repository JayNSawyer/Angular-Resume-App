var express = require('express');
var mongoose = require('mongoose');

var mongodb = mongoose.connect('mongodb://localhost/resumeApp');

var userModel = require('./models/userModel');

var User = mongoose.model('User', userModel);

var DB = {
	User: User
};

module.exports = DB;