var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userModel = new Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	username: {
		type: String
	},
	password: {
		type: String
	}
});

module.exports = userModel;