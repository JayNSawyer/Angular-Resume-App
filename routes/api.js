//'use strict';
//
//var thinky = require('thinky')({
//  host: process.env.RDB_HOST || 'localhost',
//  port: parseInt(process.env.RDB_PORT || 28015),
//  db: process.env.RDB_DB || 'ResumeApp'
//});
//
//var r = thinky.r;
//
//var User = thinky.createModel('User', {
//  firstname: type.string(),
//  lastname: type.string(),
//  email: type.string(),
//  username: type.string(),
//  passwordHash: type.string(),
//  salt: type.string(),
//  createdAt: type.date().default(r.now())
//});