var mongoose = require('mongoose');
var Hasher = require('../services/hash');
var AuthToken = require('../services/authToken');

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

userModel.methods.setPassword = function(password){
	this.salt = Hasher.setSalt();
	this.passwordHash = Hasher.setHash(password, salt);
};

userModel.methods.validatePassword = function(password){
	var passwordHash = Hasher.getHash(password, this.salt);
	return this.passwordHash = passwordHash;
};

userModel.methods.generateAuthToken = function(){
	AuthToken.generateAuthToken({
		id: this._id,
		firstname: this.firstname,
		lastname: this.lastname,
		email: this.email,
		username: this.username,
		days: 'default'
	});
};



module.exports = userModel;