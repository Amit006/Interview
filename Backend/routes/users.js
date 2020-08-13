var express = require('express');
var router = express.Router();
var UserService = require('../modal/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/Login', function(req, res, next) {
  UserService.authenticate(req.body, function(err, result){
    if(err){
      return res.status(200).json({ msg: err})
    }
    // console.log(' result: ', result);
    return res.status(200).json(result)
  });
});
router.post('/Register', function(req, res, next) {
  UserService.SignUpUser(req.body, function(err, result){
    if(err){
      return res.status(200).json({ msg: err})
    }
    // console.log(' result: ', result);
    return res.status(200).json(result)
  });
  console.groupEnd();
});
router.post('/deleteUser', function(req, res, next) {
  UserService.deleteUser(req.body, function(err, result){
    if(err){
      return res.status(200).json({ msg: err})
    }
    // console.log(' result: ', result);
    return res.status(200).json(result)
  });
});
router.get('/getAllUser', function(req, res, next) {
  UserService.getAllUsers( function(err, result){
    if(err){
      return res.status(200).json({ msg: err})
    }
    // console.log(' result: ', result);
    return res.status(200).json(result)
  });
});

router.post('/updateUser', function(req, res, next) {
  UserService.updateUser(Obj, function(err, result){
    console.log('  err: ',err, ' result: ', result);
    if(err){
      return res.status(200).json({ msg: err})
    }
    // console.log(' result: ', result);
    return res.status(200).json(result);
  })
});

module.exports = router;
