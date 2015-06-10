var express = require('express');
var mongoose = require('mongoose');
var DB = require('../db/database');
var router = express.Router();

var User = DB.User;

/* GET home page. */


/* Template */
router.get('/', function(req, res, next) {
	User.find(function(err, users){
		if(err){
			console.log(err);
		} else {
			res.render('index', {title: 'Express', users: users });
		}
	});
});


/* JSON API */

router.get('/api/users', function(req, res, next){
	User.find(function(err, users){
		if(err){
			console.log(err);
		} else {
			res.json(users);
		}
	});
 	//res.json(users);
});


module.exports = router;
