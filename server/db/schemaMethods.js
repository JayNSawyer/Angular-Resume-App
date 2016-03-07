'use strict';

let TokenService = require('../services/tokenService');
let HashService = require('../services/hashService');
let SchemaMethods = require('./schemaMethods.js');

function toJSON() {
	var obj = this.toObject();
	delete obj.passwordHash;
	delete obj.salt;
	delete obj.__v;
	return obj;
};


function validatePassword(password, passwordHash) {
	return HashService.comparePasswordToHash(password, passwordHash)
		.then((res) => { 
			if (res) {
				return true;
			} else {
				return false;
			}
		})
		.catch((error) => {
			return error;
		});
};

function getSalt() {
	return this.salt;
};

function getToken(days) {
	if (days) {
		return TokenService.generateAuthToken(this, days);
	} else {
		return TokenService.generateAuthToken(this, null);
	}
};


module.exports = {
	toJSON: toJSON,
	validatePassword: validatePassword,
	getSalt: getSalt,
	getToken: getToken
};