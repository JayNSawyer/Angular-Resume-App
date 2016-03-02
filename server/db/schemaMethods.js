var Auth = require('../authentication/authenticate');
var Hasher = require('../authentication/hash');

function toJSON() {
	var obj = this.toObject();
	delete obj.passwordHash;
	delete obj.salt;
	delete obj.__v;
	return obj;
};


function validatePassword(password, salt) {
	var compareHash = Hasher.createHash(password, salt);
	if (compareHash === this.passwordHash) {
		return true;
	}
};

function getSalt() {
	return this.salt;
};

function generateAuthToken(days) {
	if (days) {
		return Auth.generateAuthToken(this, days);
	} else {
		return Auth.generateAuthToken(this, null);
	}
};


module.exports = {
	toJSON: toJSON,
	validatePassword: validatePassword,
	getSalt: getSalt,
	generateAuthToken: generateAuthToken
};