"use strict";
var guid = require('guid');
var ObjectId = require('mongodb').ObjectID;
var mongo = require('./mongo');
const bcrypt = require('bcrypt');


//------------- LICENSES -----------------//
var authenticate = function (loginObj ,callback) {
  mongo.admin.findOne({Email:loginObj.Email}).then(function (result, err) {
    console.log(' err: ', err, ' result: ', result);
    if (err) {
      return callback(err);

    }
    if (result === null) {
      var error = new Error("Message: No admin  Found. All Requested.");
      error.status = 404;
      callback(error);
      return;
    }
      console.log(' login: ', loginObj);
    if(bcrypt.compareSync(loginObj.Password, result.Password))
      return callback(null,{ result: result, status: true});
    else
      return callback(null,{ result: result, status: false})
  });
};

module.exports = {
  authenticate: authenticate
};
