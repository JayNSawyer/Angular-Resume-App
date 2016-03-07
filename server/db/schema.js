'use strict';

let mongoose = require('mongoose');
let SchemaMethods = require("./schemaMethods");
let TokenService = require('../services/tokenService');
let HashService = require('../services/hashService');
let Schema = mongoose.Schema;

let userSchema = new Schema({
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
userSchema.methods.getToken = SchemaMethods.getToken;

module.exports = userSchema;