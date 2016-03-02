var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ApplicationController = require('../controllers/applicationController');
var UserController = require('../controllers/userController');
var LoginController = require('../controllers/loginController');
var ApiUserController = require('../controllers/api/userController');
var mongodb = mongoose.connect('mongodb://localhost/resumeApp');




router.route('/')
	.get(ApplicationController.home);

router.route('/users')
	.get(UserController.index)
	.post(UserController.create); ////TODO: refactor from old route: '/register'

router.route('/login')
	.post(LoginController.login);

router.route('/api/users')
	.get(ApiUserController.index);




module.exports = router;
