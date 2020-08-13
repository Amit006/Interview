"use strict";
var guid = require('guid');
var ObjectId = require('mongodb').ObjectID;
var mongo = require('./mongo');
const bcrypt = require('bcrypt');
let Validator = require('validatorjs');

var updateUser = function (userId, DataObj, callback) {
  if (ObjectId.isValid(userId) === false) {
    var error = new Error("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
    error.status = 500;
    callback (error);
    return;
  }
  mongo.User.updateOne({
      _id: new ObjectId(userId),
      Email: DataObj.Email
    },
    {$set: DataObj}, {w: 1}, function(err, result) {
      if (err) {
        var error3 = new Error("Cannot update license. Try again.");
        error3.status = 403;
        callback (error3);
        return;
      }
      if (result.matchedCount !== 1) {
        var error1 = new Error("No license was found.");
        error1.status = 404;
        callback (error1);
        return;
      } else if (result.modifiedCount !== 1) {
        var error2 = new Error("No license was updated.");
        error2.status = 404;
        callback (error2);
        return;
      }
      if (err) { callback (err); return; }
      callback(null, result);
    });
};

var getAllUsers = function (callback) {
  // console.log(' mongo: ', mongo);
  mongo.User.find({Status: "Active"}).toArray(function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    if (result === null) {
      var error = new Error("Message: No Users Found. All Requested.");
      error.status = 404;
      callback (error);
      return; }
    callback(null, result);
  });
};

var deleteUser = function (userObj, callback) {
  mongo.User.updateOne({Email: userObj.Email}, {  $set: { Status: "Inactive"}}).then(function (result, err ) {
    console.log(' find Result: ', err, ' result: ', result);
    if (err) {
      callback (err);
      return;
    }
    if (result === null) {
      var error = new Error("Message: No User Found. All Requested.");
      error.status = 404;
      callback (error);
      return; }
    callback(null, result);
  });
};

var authenticate = function (loginObj ,callback) {
  let rules= {
    Email:'required',
    Password:'required'
  }
  let validation = new Validator(loginObj, rules);
  if(validation.passes()) {
    mongo.User.findOne({Email: loginObj.Email, Status: 'Active'}).then(function (result, err) {
      console.log(' err: ', err, ' result: ', result);
      if (err) {
        callback({ msg: err});
        return;
      }
      if (result === null) {
        callback({ msg: "Message: No User  Found. All Requested."});
      }

      if (bcrypt.compareSync(loginObj.Password, result.Password))
        return callback(null, {result: result, status: true});
      else
        return callback(null, {result: result, status: false})
    });
  } else {
    callback({ msg: validation.errors}, null);
  }
};

var SignUpUser  = function ( data, callback ){
  let rules= {
    Email:'required'
  }
  let validation = new Validator(data, rules);

  if(validation.passes()) {
    mongo.User.findOne({Email: data.Email}).then((dataObj, err) => {
      if (err) {
        callback('Not Found contact user');
        return;
      }
      if (dataObj === null) {

        let rules1= {
          "First_Name": 'required',
          "Last_Name": 'required',
          "Email": 'required',
          "Password": 'required',
          "Address": 'required',
          "State": 'required',
          "City": 'required',
          "Country": 'required',
          "Phone_Number": 'required',
          "Date_of_Birth": 'required',
          "Status":'required',
        }
        let validation = new Validator(data, rules1);

        if(validation.passes()) {
           mongo.User.insertOne(data).then(function (result, err) {
            if (err) {
              callback('Unable to SignUp User ');
              return
            }
            if (result === undefined) {
              callback("Unable to SignUp User");
              return
            }
            console.log('result: ', result, ' err: ', err);
            callback(null, result.ops);
            return
          });
        } else {
          callback({ msg: validation.errors}, null)
        }


      } else {
        callback('Already have an account', dataObj);
        return
      }
    });
  } else {
    callback({ msg: 'Please provided a valid Email'}, null);
  }

};



module.exports = {
  updateUser: updateUser,
  getAllUsers: getAllUsers,
  deleteUser:deleteUser,
  authenticate: authenticate,
  SignUpUser: SignUpUser,
};
