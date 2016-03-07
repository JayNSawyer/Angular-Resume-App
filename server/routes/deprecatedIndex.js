'use strict';

let express = require('express');
let secrets = require('../../config/secrets.js');
let jwt = require('express-jwt');
let mongoose = require('mongoose');
let mongooseBird = require('mongoose-bird')(mongoose);
let router = express.Router();
let Hasher = require('../authentication/hash');
let _ = require('lodash');

let register = require('../services/register');
let Auth = require('../authentication/authenticate');
let passport = require('passport');

let auth = jwt({
	secret: secrets.SECRET
});
let User = require('../models/user');
let mongodb = mongoose.connect('mongodb://localhost/resumeApp');



/* Template */
router.get('/', (req, res, next) => {
	User.findAsync()
		.then((users) => {
			res.render('index', {
				title: 'Express',
				users: users
			});
		})
		.catch((err) => { console.log(err) });
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local-login', (error, user) => {
		if (error) next(error);

		if (user) {
			return res.json({
				token: user.generateAuthToken()
			});
		} else {
			return res.status(401).json({
				message: 'No user found or your password is incorrect'
			});
		}
	})(req, res, next);
});

router.post('/register', (req, res, next) => {
	passport.authenticate('local-register', (error, user) => {
		if (error) next(error);

		if (user) {
			return res.json({
				token: user.generateAuthToken()
			});
		} else {
			return res.status(401).json({
				message: 'Registration failed!'
			});
		}
	})(req, res, next);

});

router.post('/reset-password', (req, res, next) => {
	//TODO: (1) once the functionality is working, the user will have to reset her password from her email account!
	//TODO: (2) extract the hashing and salting into an external service...this should NOT be performed in the router!
	var email = req.body.email;
	var password = req.body.password;
	var salt;
	var hash;

	var search = {
		email: email
	};

	User.findOneAsync(search)
		.then((user) => {
			salt = user.getSalt();
			hash = Hasher.createHash(password, salt);
			user.passwordHash = hash;
			return user.saveAsync();
		})
		.then((user) => {
			return res.json(user)
		})
		.catch((error) => {
			return next(error);
		});

});


/* JSON API */

router.get('/api/users', (req, res, next) => {

	User.findAsync()
		.then((users) => { res.json(users) })
		.catch((error) => { console.log(error) });

});


module.exports = router;