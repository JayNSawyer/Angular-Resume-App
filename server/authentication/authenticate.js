'use strict';

let express = require('express');



function validate(req, res){
	if (!req.body.username || !req.body.password){
		return res.status(400).json({message: 'There was a problem with your username or password'});
	}
};


var Auth = {
	validate: validate
};

module.exports = Auth;
