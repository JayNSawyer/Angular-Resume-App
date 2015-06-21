var Hasher = require('../services/hash');

function defineUserSchema(User){
	User.find({}).exec(function(error, collection){
		if(collection.length === 0){
			var salt;
			var hash;
			salt = Hasher.setSalt();
			hash = Hasher.setHash('timmy81', salt);
			User.create({firstname: 'Tim', lastname: 'Robbins', email: 'tim@robbins81@example.com', username: 'TimRobbins81', salt: salt, passwordHash: hash});
			salt = Hasher.setSalt();
			hash = Hasher.setHash('jimmy81', salt);
			User.create({firstname: 'Jimmy', lastname: 'Jones', email: 'jim@jones81@example.com', username: 'Jimmy81', salt: salt, passwordHash: hash});
			salt = Hasher.setSalt();
			hash = Hasher.setHash('tommy81', salt);
			User.create({firstname: 'Tommy', lastname: 'Thompson', email: 'tom@thompson81@example.com', username: 'Tommy81', salt: salt, passwordHash: hash});
		}
	});
}

var seeds = {
	defineUserSchema: defineUserSchema
};

module.exports = seeds;

