'use strict';

var thinky = require('thinky')();
var r = thinky.r;
var User = require('../models/user');
var comparePassword = Promise.promisify(require('../models/user').comparePassword);
var Auth = require('../services/authenticate');
var Promise = require('bluebird');
var user;

var authController = function (req, res) {

  return {
    authenticate: authenticate
  };

  function authenticate(req, res) {
    Auth.validate(req, res);
    
    User.filter({username: req.body.username})
      .run()
      .then(function(userArray){
        user = userArray[0];
      
        if (!user) {
          throw new Error('No user found or your password is incorrect.');
        }
      
        return user;
      })
      .then(function(user){    
        return comparePassword(req.body.password, user);      
      })
      .then(function(valid){  
        if (!valid) {
          throw new('The username or password is incorrect.');
        }
        res.json({
          token: Auth.generateAuthToken(user);
        });
      })
      .catch(function(error){
        res.json({
          message: error
        });
      }); 
  }
};


module.exports = authController;