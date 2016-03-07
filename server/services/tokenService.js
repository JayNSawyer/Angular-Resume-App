'use strict';

let express = require('express');
let moment = require('moment');
let jwt = require('jsonwebtoken');
let expressJWT = require('express-jwt');
let secrets = require('../../config/secrets.js');
let auth = expressJWT({secret: secrets.SECRET});



function generateAuthToken(user, days){
	var expire;

	if(!days){
		expire = moment().add('days', 30).valueOf(); //default to 30 days
	} else {
		expire = moment().add('days', days).valueOf();
	}

	return jwt.sign({
		id: user.id,
		firstname: user.firstname,
		lastname: user.lastname,
		email: user.email,
		username: user.username,
		expiration: expire
	}, secrets.SECRET);
};

let TokenService = {
	generateAuthToken: generateAuthToken
};

module.exports = TokenService;
