var mongoose = require('mongoose');
var Hasher = require('../helpers/hash');

var Schema = mongoose.Schema;

var userModel = new Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
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

userModel.methods.setPassword = function(password){
	this.salt = Hasher.setSalt();
	this.passwordHash = Hasher.setHash(password, salt);
};

userModel.methods.validatePassword = function(password){
	var passwordHash = Hasher.getHash(password, this.salt);
	return this.passwordHash = passwordHash;
};


module.exports = userModel;