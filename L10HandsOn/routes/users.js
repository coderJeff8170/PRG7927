var express = require('express');
var router = express.Router();
const models = require('../models');
var authService = require('../services/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//GET signup page
router.get('/signup', function(req, res, next){
  res.render('signup');
});

//POST signup form
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
//TODO: change this to go right to user profile after testing..
      res.render('login', {
        message: "User Successfully created! please login!"
      });
    }else{
      res.send('this user already exists');
    }
  });
});

//GET login page
router.get('/login', function(req, res, next){
  res.render('login', {
    message: "Welcome, please login!"
  });
});

//POST login form
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
router.get('/profile', function (req, res, next) {
  //get the token from the request
  let token = req.cookies.jwt;
  //if there is one
  if (token) {
    //verify
    authService.verifyUser(token)
      .then(user => {
        //if verified
        if (user) {
          //and if admin
          if(user.Admin){
            models.users.findAll({
              where: {
                Deleted: false
              }
              //TODO: and not current user.(user.UserId?)
            })
            .then(users =>{
              res.render('admin', {
                firstname: user.FirstName,
                lastname: user.LastName,
                email: user.Email,
                username: user.Username,
                users: users
              });
            });
          //else if regular user
          }else{
            res.render('profile', {
              firstname: user.FirstName,
              lastname: user.LastName,
              email: user.Email,
              username: user.Username
            });
          }
          //if unable to verify
        } else {
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


//POST logout button - logout is actually get?
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.render('login', {
    message: "Log Back In:"
  });
  });

//TODO: delete user
router.post('/:id', function(req, res, next){
    
  let userId = parseInt(req.params.id);

    models.users
    .update({ Deleted: true }, { where: {
        UserId: userId
    }})
    .then(
      res.send('user successfully deleted')
      //res.redirect(`/profile`)
    )
    .catch(err => {
      res.status(400);
      res.send('Houston, we have a problem!');
    });
})
// router.put('/:id', function (req, res, next) {
//   let userId = parseInt(req.params.id);
//   models.users
//   //don't need req.body here because you're deleting the whole thing as opposed to updating some portion of it
//   .update( { Deleted: true }, { where: { userId : UserId } })
//   .then(result => {
//     res.redirect('/users/profile');
//     //res.send('user deleted');
//   })
//   .catch(err => {
//     res.status(400);
//     res.send("You're having trouble deleting this fella!")
//   })
// });

module.exports = router;
