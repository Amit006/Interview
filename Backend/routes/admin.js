var express = require('express');
var router = express.Router();
var UserService = require('../modal/User');
var AdminService = require('../modal/Admin');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/Login', function(req, res, next) {
  AdminService.authenticate(req.body, function(err, result){
    if(err){
      return res.status(200).json({ msg: err})
    }
    // console.log(' result: ', result);
    return res.status(200).json(result)
  });
});
module.exports = router;
