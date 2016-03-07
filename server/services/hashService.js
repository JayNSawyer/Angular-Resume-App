'use strict';

let bcrypt = require('bcryptjs');
let Promise = require('bluebird');
let genSaltAsync = Promise.promisify(bcrypt.genSalt);
let hashAsync = Promise.promisify(bcrypt.hash);
let compareAsync = Promise.promisify(bcrypt.compare);


let HashService = {
	setSalt: function () {
		return genSaltAsync(10)
			.then((salt) => { return salt; })
			.catch((error) => { console.log('error in hashservice.setSalt' + error); return error; });
	},
	createHash: function (passwordParam, salt) {
		return hashAsync(passwordParam, salt)
			.then((hash) => { return hash; })
			.catch((error) => { console.log('error in hashservice.createhash' + error); return error; });
	},
	comparePasswordToHash: function (password, hashedPassword) {		
		return compareAsync(password, hashedPassword)
			.then((res) => { return res; }) 
			.catch((error) => { console.log('error in hashservice.comparePasswordToHash' + error); return error; });
	}
};


module.exports = HashService;