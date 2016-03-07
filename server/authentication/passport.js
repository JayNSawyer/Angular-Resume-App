'use strict';

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
let Promise = require('bluebird');
let User = require('../models/user');
let createUser = require('../services/createUserService')['createUser'];

mongoose.Promise = Promise;

let loginStrategy = new LocalStrategy(
	(username, password, done) => {

		var foundUser;
		
		User.findOne({username: username})
			.then((user) => {
				if (!user) {
					return done(null, false);
				}
				foundUser = user;
				return user.validatePassword(password, user.passwordHash);
			})
			.then((res) => {
				if (res) {
					return done(null, foundUser.getToken());
				} else {
					return done(null, false);
				}
			})
			.catch((error) => {
				console.log('error in passport loginStrategy: ' + error);
				return done(error);
			});
	}
);

let registerStrategy = new LocalStrategy(
	{ passReqToCallback: true}, (req, username, password, done) => {
	//ensure user does NOT already exist!
	User.findOne({username: username})
		.then((user) => {
			if (!user) {
				return createUser(req.body);
			} else {
				//user already exists
				return done(null, false);
			}
		})
		.then((user) => {
			return user.save();
		})
		.then((newUser) => {
			return done(null, newUser.getToken());
		})
		.catch((error) => {
			console.log('error in passport registerStrategy: ' + error);
			return done(error);
		});
		
});

passport.use('local-login', loginStrategy);
passport.use('local-register', registerStrategy);