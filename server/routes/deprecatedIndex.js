var express = require('express');
var secrets = require('../../config/secrets.js');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var mongooseBird = require('mongoose-bird')(mongoose);
var router = express.Router();
var Hasher = require('../authentication/hash');
var _ = require('lodash');

var register = require('../services/register');
var Auth = require('../authentication/authenticate');
var passport = require('passport');

var auth = jwt({
  secret: secrets.SECRET
});
var User = require('../models/user');
var mongodb = mongoose.connect('mongodb://localhost/resumeApp');



/* Template */
router.get('/', function (req, res, next) {
  User.findAsync()
    .then(function (users) {
      res.render('index', {
        title: 'Express',
        users: users
      });
    })
    .catch(function (err) {
      console.log(err);
    })
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

  User.findOneAsync(search)
    .then(function (user) {
      salt = user.getSalt();
      hash = Hasher.createHash(password, salt);
      user.passwordHash = hash;
      return user.saveAsync();
    })
    .then(function (user) {
      return res.json(user)
    })
    .catch(function (error) {
      return next(error);
    });

});


/* JSON API */

router.get('/api/users', function (req, res, next) {

  User.findAsync()
    .then(function (users) {
      res.json(users);
    })
    .catch(function (error) {
      console.log(error);
    })
  
});


module.exports = router;