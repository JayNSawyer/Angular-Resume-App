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


module.exports = userModel;