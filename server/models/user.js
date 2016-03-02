var mongoose = require('mongoose');
var mongooseBird = require('mongoose-bird')(mongoose);
var userSchema = require('../db/schema.js')['userSchema'];
//var seed = require('../db/seeds.js')['seedUser'];

var User = mongoose.model('User', userSchema);

/*
User.find({})
	.execAsync()
	.then(function (collection) {
		if (collection.length === 0) {
			seed(User);
		}
	})
	.catch(function (error) {
		console.log(error);
	})
*/

module.exports = User;