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
      callback(err);
      return;
    }
    if (result === null) {
      var error = new Error("Message: No Admin  Found. All Requested.");
      error.status = 404;
      callback(error);
      return;
    }

    if(bcrypt.compareSync(loginObj.password, result.password))
      return callback(null,{ result: result, status: true});
    else
      return callback(null,{ result: result, status: false})

  });
};

module.exports = {
  authenticate: authenticate
};
