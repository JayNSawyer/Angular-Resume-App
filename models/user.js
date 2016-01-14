'use strict';

var Promise = require('bluebird');
var thinky = require('thinky')({
  host: process.env.RDB_HOST || 'localhost',
  port: parseInt(process.env.RDB_PORT || 28015),
  db: process.env.RDB_DB || 'ResumeApp'
});

var r = thinky.r;
var type = thinky.type;

var bcrypt = Promise.promisifyAll(require('bcrypt'));

var User = thinky.createModel('User', {
  id: type.string(),
  firstname: type.string(),
  lastname: type.string(),
  email: type.string(),
  username: type.string(),
  password: type.string(),
  createdAt: type.date().default(r.now())
});


User.pre('save', function (next) {
  
  var self = this;

  return bcrypt.genSaltAsync(10)
    .then(function (salt) {
      return bcrypt.hashAsync(self.password, salt);
    })
    .then(function (hash) {
      self.password = hash;
      next();
    })
    .catch(function (error) {
      next(error);
    });

});

User.define("comparePassword", function (bodyPassword, user, callback) {
  
  return bcrypt.compareAsync(bodyPassword, user.password)
    .then(function (match) {
      callback(null, true);
    })
    .catch(function (error) {
      callback(error);
    });

})


module.exports = User;