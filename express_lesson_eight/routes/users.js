var express = require('express');
var router = express.Router();
const models = require('../models');
const authService = require('../services/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//add a signup route - create user if one doesn't exist
router.post('/signup', function(req, res, next){
  models.users.findOrCreate({
    where: {
      Username: req.body.username
    },
    defaults: {
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      Email: req.body.email,
      //bcrypt here:
      //Password: req.body.password = becomes:
      Password: authService.hashPassword(req.body.password)
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

//from chapter
// router.post('/login', function (req, res, next) {
//   models.users.findOne({
//     where: {
//       Username: req.body.username
//     }
//   }).then(user => {
//     if (!user) {
//       console.log('User not found')
//       return res.status(401).json({
//         message: "Login Failed"
//       });
//     } else {
//       let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
//       if (passwordMatch) {
//         let token = authService.signUser(user);
//         res.cookie('jwt', token);
//         res.send('Login successful');
//       } else {
//         console.log('Wrong password');
//         res.send('Wrong password');
//       }
//     }
//   });
// });



//post login, user gonna receive a jwt.
//remember, you're trying to find out if a password and a username match
//does this do the same thing as the one in last chapter and if so, how are they different
// router.post('/login', function(req, res, next){
//   models.users.findOne({
//     where: {
//       Username: req.body.username,
//       Password: req.body.password
//     }
//   })
//   .then(user =>{
//     if(!user){
//       console.log('User not found');
//       res.status(401).json({
//         message: 'login failed!'
//       });
//     }else{
//       let token = authService.signUser(user);
//       res.cookie('jwt', token);
//       res.send('login successful!');
//     }
//   });
// });

// my compare password update
// router.post('/login', function(req, res, next){
//   models.users.findOne({
//     where: {
//       Username: req.body.username
//     }
//   })
//   .then(user =>{
//     console.log(user);
//     if(!user){
//       console.log('User not found');
//       res.status(401).json({
//         message: 'login failed!'
//       });
//     }else{
//       //check password here with bcrypt boolean
//       let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
//       if (passwordMatch){
//         let token = authService.signUser(user);
//       res.cookie('jwt', token);
//       res.send('login successful!');
//       }else{
//         res.send('sorry wrong password');
//       } 
//     }
//   });
// });

//test function
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (!user) {
      res.send('user not found');
      
    } else {
        res.send('User exists');
    }
  });
});




//use token to produce a secure route for a user's profile page
router.get('/profile', function(req, res, next){
  //get the users token, if there is one - here it is inside the cookies property of the request
  let token = req.cookies.jwt;
  if(token){
    authService.verifyUser(token)
    .then(user => {
      if(user){
        res.send(JSON.stringify(user));
      }else{
        res.status(401);
        res.send('Must be logged in');
      }
    });
  }else{
    res.status(401);
    res.send('you must be loggied in!');
  }
  
});

//to logout a user, you can make the cookies expire immediately or set them to something that won't render
router.get('/logout', function(req, res, next){
  //set the cookie to something that will expire immediately
  res.cookie('jwt', '', { expires: new Date(0) });
  res.send('logged out!');
  //you'll now need to add something to profile route to handle a lack of token..
});


module.exports = router;
