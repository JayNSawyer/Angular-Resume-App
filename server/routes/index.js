'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let mongodb = mongoose.connect('mongodb://localhost/resumeApp');
let ApplicationController = require('../controllers/applicationController');
let UserController = require('../controllers/userController');
let LoginController = require('../controllers/loginController');
let ApiUserController = require('../controllers/api/userController');


router.route('/')
	.get(ApplicationController.home);

router.route('/users')
	.get(UserController.index)
	.post(UserController.create); 

/* TODO:
router.route('/users/:id')
	.get(UserController.show)
	.put(UserController.edit);
*/	

router.route('/login')
	.post(LoginController.login);

router.route('/api/users')
	.get(ApiUserController.index);




module.exports = router;
