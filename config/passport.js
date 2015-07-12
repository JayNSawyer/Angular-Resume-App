var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
require('../db/collections');
var User = mongoose.model('User');

passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({username: username}, function(error, user){
			if (error){ return done(error); }
			if (!user){
				return done(null, false);
			}
			if( user.validatePassword(password, user.salt) ){
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}
));