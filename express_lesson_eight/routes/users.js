var express = require('express');
var router = express.Router();
const models = require('../models');
const authService = require('../services/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//add a signup

router.post('/signup', function(req, res, next){
  models.user.findOrCreate({
    where: {
      Username: req.body.username
    },
    defaults: {
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      Email: req.body.email,
      Password: req.body.password
    }
  })
  .spread(function(result, created){
    if(created){
      res.send('user made successfully');
    }else{
      res.send('user already exists');
    }
  });
});

module.exports = router;
