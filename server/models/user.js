'use strict';

let mongoose = require('mongoose');
let mongooseBird = require('mongoose-bird')(mongoose);
let userSchema = require('../db/schema.js');

//var seed = require('../db/seeds.js')['seedUser'];


let User = mongoose.model('User', userSchema);

module.exports = User;