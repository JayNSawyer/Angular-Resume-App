var Hasher = require('../authentication/hash');

//TODO: promisify method(s)!
/*
function seedUser(User) {
	var salt;
	var hash;
	salt = Hasher.setSalt();
	hash = Hasher.createHash('timmy81', salt);
	User.create({
		firstname: 'Tim',
		lastname: 'Robbins',
		email: 'tim@robbins81@example.com',
		username: 'TimRobbins81',
		salt: salt,
		passwordHash: hash
	});
	salt = Hasher.setSalt();
	hash = Hasher.createHash('jimmy81', salt);
	User.create({
		firstname: 'Jimmy',
		lastname: 'Jones',
		email: 'jim@jones81@example.com',
		username: 'Jimmy81',
		salt: salt,
		passwordHash: hash
	});
	salt = Hasher.setSalt();
	hash = Hasher.createHash('tommy81', salt);
	User.create({
		firstname: 'Tommy',
		lastname: 'Thompson',
		email: 'tom@thompson81@example.com',
		username: 'Tommy81',
		salt: salt,
		passwordHash: hash
	});
}

var seeds = {
	seedUser: seedUser
};

module.exports = seeds;
*/