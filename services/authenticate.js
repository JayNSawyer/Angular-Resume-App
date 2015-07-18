var express = require('express');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
var secrets = require('../config/secrets.js');
var auth = expressJWT({secret: secrets.SECRET});



function authenticate(req, res, next){
	if (!req.body.username || !req.body.password){
		res.status(400).json({message: 'There was a problem with your username or password'});
	}
	next();
};

function generateAuthToken(user, days){
	var expire;

	if(!days){
		expire = moment().add('days', 30).valueOf(); //default to 30 days
	} else {
		expire = moment().add('days', days).valueOf();
	}

	return jwt.sign({
		_id: user._id,
		firstname: user.firstname,
		lastname: user.lastname,
		email: user.email,
		username: user.username,
		expiration: expire
	}, secrets.SECRET);
};

var Auth = {
	authenticate: authenticate,
	generateAuthToken: generateAuthToken
};

module.exports = Auth;
