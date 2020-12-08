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

//POST signup form
//changed to use hashpassword function
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
      //Password: req.body.password
      Password: authService.hashPassword(req.body.password)
    }
  }).spread(function(result, created){
    if(created){
      //res.send('user successfully created');
//TODO: change this to go right to user profile after testing..
      res.render('login', {
        message: "User Successfully created! please login!"
      });
    }else{
      res.send('this user already exists');
    }
  });
});

//TODO: GET login page
router.get('/login', function(req, res, next){
  res.render('login', {
    message: "Welcome, please login!"
  });
});

//POST login form
//updated to use token
//TODO: update to compare hashed passwords

router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.redirect('/users/profile');
      } else {
        console.log('Wrong password');
        res.send('Wrong password');
      }
    }
  });
});

//GET profile - secure route:
//updated to check for token because of logout
//admin profile if user is admin
router.get('/profile', function (req, res, next) {
  //get the token from the request
  let token = req.cookies.jwt;
  //if there is one
  if (token) {
    //verify it
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          if(user.Admin){
            res.render('admin', {
              firstname: user.FirstName,
              lastname: user.LastName,
              email: user.Email,
              username: user.Username
            });
          }else{
            res.render('profile', {
              firstname: user.FirstName,
              lastname: user.LastName,
              email: user.Email,
              username: user.Username
            });
          }
        } else {
          //if unable to verify
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    //if there's no token, they're logged out
    res.status(401);
    res.send('Must be logged in');
  }
});

// router.get('/profile', function (req, res, next) {
//   //get the token from the request
//   let token = req.cookies.jwt;
//   //if there is one
//   if (token) {
//     //verify it
//     authService.verifyUser(token)
//       .then(user => {
//         if (user) {
//           if(user.Admin){
//             res.render('admin', {
//               firstname: user.FirstName,
//               lastname: user.LastName,
//               email: user.Email,
//               username: user.Username
//             });
//           }else{
//             res.render('profile', {
//               firstname: user.FirstName,
//               lastname: user.LastName,
//               email: user.Email,
//               username: user.Username
//             });
//           }
//         } else {
//           //if unable to verify
//           res.status(401);
//           res.send('Invalid authentication token');
//         }
//       });
//   } else {
//     //if there's no token, they're logged out
//     res.status(401);
//     res.send('Must be logged in');
//   }
// });


//TODO: POST logout button - logout is actually get?
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.render('login', {
    message: "Log Back In:"
  });
  });

module.exports = router;
