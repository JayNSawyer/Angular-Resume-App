var express = require('express');
var authToken = require('../services/authToken');
var secrets = require('../config/secrets.js');

var mongoose = require('mongoose');
var DB = require('../db/collections');
var router = express.Router();

var register = require('../services/register');
var validation = require('../services/validation');
var passport = require('passport');

var User = DB.User;


/* GET home page. */


/* Template */
router.get('/', function(req, res, next) {
	User.find(function(err, users){
		if(err){
			console.log(err);
		} else {
			res.render('index', {title: 'Express', users: users });
		}
	});
});

router.post('/login', function(req, res, next){
	if(!req.body.username){
		return res.status(400).json({message: 'an error occurred!'});
	}

	passport.authenticate('local', function(error, user){
		if(error) next(error); 

		if(user){
			return res.json({token: user.generateAuthToken() });
		} else {
			return res.status(401).json({message: 'An error occurred while attempting to retrieve user'});
		}
	})(req, res, next);
});

router.post('/register', function(req, res, next){
	var user;

	if(!req.body.username){
		return res.status(400).json({message: 'an error occurred!'});
	}

	if(req.body){
		user = register.registerUser(req.body);
		user.save(function (error){
			if (error) {console.log('an error'); return next(error); }
			return res.json({token: user.generateAuthToken() });
		});
	}

});


/* JSON API */

router.get('/api/users', function(req, res, next){
	User.find(function(err, users){
		if(err){
			console.log(err);
		} else {
			res.json(users);
		}
	});
 	//res.json(users);
});


module.exports = router;
