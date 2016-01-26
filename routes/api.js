var express = require('express');
var router = express.Router();
var applicationController = require('../controllers/applicationController');
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');


//Endpoints

router.route('/').get(applicationController.home);
router.route('/users').post(userController.create);
router.route('/users').get(userController.index);
router.route('/login').post(authController.authenticate);