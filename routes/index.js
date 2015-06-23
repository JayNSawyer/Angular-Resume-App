var express = require('express');
var authToken = require('../services/authToken');
var mongoose = require('mongoose');
var DB = require('../db/collections');
var router = express.Router();
var register = require('../services/register');
var validation = require('../services/validation');
var passport = require('passport');


var validates = validation.validates;
var User = DB.User;
var registerUser = register.registerUser;
var getAuth = authToken.getAuth();


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
	var login = validates({
		body: req.body, 
		feature: 'login'
	});

	if(login.status.presence === false){
		return res.status(400).json({message: login.status.message});
	}

	if(login.status.presence === true){
		passport.authenticate('local', function(error, user){
			if(error) next(error); 

			if(user){
				return res.json({token: user.generateAuthToken() });
			} else {
				return res.status(401).json({message: 'An error occurred while attempting to retrieve user'});
			}
		});
	//	return res.json({token: user.generateAuthToken() })
	}
});

router.post('/register', function(req, res, next){
	var user;
	var register = validates({
		body: req.body,
		feature: 'register'
	});

	if(register.status.presence === false){
		return res.status(400).json({message: register.status.message});
	}

	if(register.status.presence === true){
		user = registerUser(body);
		user.save(function (error){
			if (error) {return next(error); }
			return res.json({token: user.generateAuthToken() });
		});
	}

});


/* JSON API */

router.get('/api/users', getAuth, function(req, res, next){
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
