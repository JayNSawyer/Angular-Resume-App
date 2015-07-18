var mongoose = require('mongoose');
var crypto = require('crypto');
var Hasher = require('../services/hash');
var jwt = require('jsonwebtoken');
var secrets = require('../config/secrets.js');
var moment = require('moment');
var Auth = require('../services/authenticate');




var Schema = mongoose.Schema;

var userModel = new Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	email: {
		type: String,
		unique: true
	},
	username: {
		type: String,
		unique: true
	},
	passwordHash: {
		type: String
	},
	salt: {
		type: String
	}
});

userModel.methods.toJSON = function(){
	var obj = this.toObject();
	delete obj.passwordHash;
	delete obj.salt;
	delete obj.__v;
	return obj;
};

userModel.methods.validatePassword = function(password, salt){
	var compareHash = Hasher.createHash(password, salt);
	if (compareHash === this.passwordHash){
		return true;
	}
};

userModel.methods.generateAuthToken = function(days){
	if(days){
		return Auth.generateAuthToken(this, days);
	} else {
		return Auth.generateAuthToken(this, null);
	}
};



module.exports = userModel;