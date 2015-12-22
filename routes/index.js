var express = require('express');
var secrets = require('../config/secrets.js');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var DB = require('../db/collections');
var router = express.Router();
var Hasher = require('../services/hash');
var _ = require('lodash');

var register = require('../services/register');
var Auth = require('../services/authenticate');
var passport = require('passport');

var auth = jwt({
    secret: secrets.SECRET
});

var User = DB.User;


/* Template */
router.get('/', function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Express',
                users: users
            });
        }
    });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (error, user) {
        if (error) next(error);

        if (user) {
            return res.json({
                token: user.generateAuthToken()
            });
        } else {
            return res.status(401).json({
                message: 'No user found or your password is incorrect'
            });
        }
    })(req, res, next);
});

router.post('/register', function (req, res, next) {
    passport.authenticate('local-register', function (error, user) {
        if (error) next(error);

        if (user) {
            return res.json({
                token: user.generateAuthToken()
            });
        } else {
            return res.status(401).json({
                message: 'Registration failed!'
            });
        }
    })(req, res, next);
    // var user;
    // var body = req.body;
    // var search = {
    // 	email: body.email
    // };

    // if(!body.username || !body.password){
    // 	return res.status(400).json({message: 'an error occurred!'});
    // }

    //Ensure user doesn't already exist!
    // User.findOne(search, function (error, user){
    // 	if (err) return next(error);
    // 	if (user) {
    // 		return res.json({message: 'This email already exists!'});
    // 	}
    // });

    // user = register.createUser(body);
    // user.save(function (err){
    // 	if (err){
    // 		return next(err);
    // 	}
    // 	return res.json({ token: user.generateAuthToken() });
    // });

});

router.post('/reset-password', function (req, res, next) {
    //TODO: (1) once the functionality is working, the user will have to reset her password from her email account!
    //TODO: (2) extract the hashing and salting into an external service...this should NOT be performed in the router!
    var email = req.body.email;
    var password = req.body.password;
    var salt;
    var hash;

    var search = {
        email: email
    };

    User.findOne(search, function (error, user) {
        if (error) {
            return next(error);
        }

        if (user) {
            salt = user.getSalt();
            hash = Hasher.createHash(password, salt);
            user.passwordHash = hash;
            user.save(function (error) {
                if (error) {
                    return next(error);
                }
                return res.json(user);
            });
        }
    });

});


/* JSON API */

router.get('/api/users', function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});


module.exports = router;