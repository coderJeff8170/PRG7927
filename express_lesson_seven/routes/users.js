var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//get the signup route
router.get('/signup', function(req, res, next){
  res.render('signup');
});
//post for the signup form
router.post('/signup', function(req, res, next){
  models.users
  .findOrCreate({
    where : {
      UserName : req.body.username
    },
    defaults : {
      FirstName : req.body.firstname,
      LastName : req.body.lastname,
      Email : req.body.email,
      Password : req.body.password,

    }
  })
  .spread(function(result, created){
    if(created){
      res.send('user successfully created');
    }else{
      res.send('something went drastically wrong!');
    }
  });
});

//login pages

router.get('/login', function(req, res, next){
  res.render('login');
});

router.post('/login', function(req, res, next){
  models.users.findOne(
    { where: {
      UserName: req.body.username,
      Password: req.body.password
    }
    })
    .then(user => {
      if(user){
        res.send('login successful');
      }else{
        res.send('invalid login!');
      }
    });
});

module.exports = router;
