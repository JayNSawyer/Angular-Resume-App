'use strict';

var thinky = require('thinky');
var r = thinky.r;
var type = thinky.type;
var User = require('../models/user');
var Auth = require('../services/authenticate');


var userController = function (req, res) {

  return {
    create: create,
    index: index
  };

  function create(req, res) {
    Auth.validate(req, res);

    /* TODO: extract to UserRegistration Service */
    User.filter({
        username: req.body.username
      })
      .run()
      .then(function (userArray) {
        if (userArray[0]) {
          return res.json({
            message: 'User already exists. Try again.'
          });
        }

        var user = new User(req.body);

        return user.save();
      }) /* END TODO */
      .then(function (result) {
        console.log("User successfully created.");
        res.status(201).json({
          token: Auth.generateAuthToken(user, null);
        })
      })
      .catch(function (error) {
        res.json({
          message: error
        });
      });
  }
  
  function index(req, res) {
    User.run()
      .then(function(result){
        res.send(JSON.stringify(result));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}


module.exports = userController;