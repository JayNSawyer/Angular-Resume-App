var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
//var User = mongoose.model('User');
var User = require('../models/user');
var Hasher = require('../authentication/hash');
var register = require('../services/register');


var loginStrategy = new LocalStrategy(
	function (username, password, done){
		User.findOne({username: username}, function(error, user){
			//TODO: promisify!
			if (error){ return done(error); }
			if (!user){
				return done(null, false);
			}
			if( user.validatePassword(password, user.salt) ){
			//TODO: promisify!
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}
);

var registerStrategy = new LocalStrategy(
	{passReqToCallback : true},
	function (req, username, password, done){
		//ensure user does NOT already exist!
		User.findOne({username: username}, function(error, user){
			if (error){ return done(error); }
			if (!user){ //user not found, so create a new user
				var body = req.body
				var newUser = register.createUser(body);

				newUser.save(function (error){
					done(null, newUser);
				});
			} else {
				//user already exists with this username!
				return done(null, false);
			}
		});

		
	}
);

passport.use('local-login', loginStrategy);
passport.use('local-register', registerStrategy);