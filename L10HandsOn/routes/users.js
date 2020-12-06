var express = require('express');
var router = express.Router();
const models = require('../models');
var authService = require('../services/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//TODO: GET signup page
router.get('/signup', function(req, res, next){
  res.render('signup');
});

//TODO: POST signup form

router.post('/signup', function(req, res, next){
  models.users
  .findOrCreate({
    where: {
      Email: req.body.email
    },
    defaults: {
      FirstName: req.body.firstname,
      LastName: req.body.lastname,
      Email: req.body.email,
      Username: req.body.username,
      Password: req.body.password
    }
  }).spread(function(result, created){
    if(created){
      res.send('user successfully created');
    }else{
      res.send('this user already exists');
    }
  });
});

//TODO: GET login page
router.get('/login', function(req, res, next){
  res.render('login');
});

//TODO: POST login form
//TODO: POST login form
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username,
      Password: req.body.password
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    }
    if (user) {
      let token = authService.signUser(user); // <--- Uses the authService to create jwt token
      res.cookie('jwt', token); // <--- Adds token to response as a cookie
      res.render('profile', {
                firstname: user.FirstName,
                lastname: user.LastName,
                email: user.Email,
                username: user.Username
              });
    } else {
      console.log('Wrong password');
      res.redirect('login')
    }
  });
});
// router.post('/login', function(req, res, next){
//   models.users
//   .findOne({
//     where: {
//       Username: req.body.username,
//       Password: req.body.password
//     }
//   })
//   .then(user => {
//     if(user){
//       res.render('profile', {
//         firstname: user.FirstName,
//         lastname: user.LastName,
//         email: user.Email,
//         username: user.Username
//       });
//     }else{
//       res.send('login failed');
//     }
//   })
// })

//TODO: POST logout button - logout is actually get?
router.get('/logout', function(req, res, next){
  res.send('logged out');
})

module.exports = router;
