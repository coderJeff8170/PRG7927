var express = require('express');
var router = express.Router();
var models = require('../models'); //<--- Add models
var authService = require('../services/auth'); //<--- Add authentication service

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

// Create new user if one doesn't exist
router.post('/signup', function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password) //<--- Change to this code here
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});

//login get route for testing
router.get('/login', function(req, res, next){
  res.render('login');
})
// Login user and return JWT as cookie
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
        res.send('Login successful');
      } else {
        console.log('Wrong password');
        res.send('Wrong password');
      }
    }
  });
});

router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.send(JSON.stringify(user));
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

//needs to be before parameterized route - order matters
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
  });

//get route to return information dynamically about a user
router.get('/:id', function(req, res, next){
  let userId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if(token) {
    authService.verifyUser(token)
    .then(user => {
      if (user) {
        if(user.Admin){
          models.users.findOne({
            where: {
              UserId: userId
            }
          })
          .then(foundUser => {
            if(foundUser){
              res.send(JSON.stringify(foundUser));
            }else{
              res.send(`cannot find user ${userId}`);
            }
          })
        }else{
          res.send(`youre not an admin! You're not allowed so see user ${userId}`);
        }
        
      } else {
        res.status(401);
        res.send('Invalid authentication token');
      }
    })
  } else {
    res.status(401);
    res.send('you not logged in, bro');
  }
})




module.exports = router;
