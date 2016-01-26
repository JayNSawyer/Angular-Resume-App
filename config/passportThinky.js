var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var DB = require('../db/userSchema');
var User = DB.User;
//require('../db/collections');
//var User = mongoose.model('User');
var Hasher = require('../services/hash');
var register = require('../services/newRegister');


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

passport.use('local-register', registerStrategy);