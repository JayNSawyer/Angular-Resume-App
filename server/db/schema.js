var mongoose = require('mongoose');
var SchemaMethods = require("./schemaMethods");

var Schema = mongoose.Schema;

var userSchema = new Schema({
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

userSchema.methods.toJSON = SchemaMethods.toJSON;
userSchema.methods.validatePassword = SchemaMethods.validatePassword;
userSchema.methods.getSalt = SchemaMethods.getSalt;
userSchema.methods.generateAuthToken = SchemaMethods.generateAuthToken;


var schemas = {
	userSchema: userSchema
};

module.exports = schemas;