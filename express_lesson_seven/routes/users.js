var express = require('express');
var router = express.Router();
const models = require('../models');
//bring in passport
const passport = require('../services/passport');

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

// router.post('/login', function(req, res, next){
//   models.users.findOne(
//     { where: {
//       UserName: req.body.username,
//       Password: req.body.password
//     }
//     })
//     .then(user => {
//       if(user){
//         res.send('login successful');
//       }else{
//         res.send('invalid login!');
//       }
//     });
// });//^^ because we're using passport, this gets replaced with this vv
//second param describe what happens on failure
//watch your path convention here!!!!
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login'
}),
function(req, res, next){
  res.redirect('profile');
});

//vv this needs to change so that individual profile routes are only available
//to the pertinent logged-in entity.
// //create a route to the profile/id view
// router.get('/profile/:id', function(req, res, next){
//   //no where clause required for findbypk
//   models.users.findByPk(parseInt(req.params.id)).then(
//     user => {
//       if(user){
//         res.render('profile', {
//           FirstName: user.FirstName,
//           LastName: user.Lastname,
//           Email: user.Email,
//           UserName: user.UserName
//         })
//       }else{
//         res.send('sorry, user does not exist');
//       }
//     }
//   )
// });

//when you change this to render only the user profile, you must also
//change the login POST route so that it doesn't use req.params.id also
router.get('/profile', function(req, res, next){
  //must check to see if there is a user logged in by
  //seeing if passport has produced a user on the req property:
  if(req.user){
  //passport produces user on req, which has UserId as a property:
  models.users.findByPk(parseInt(req.user.UserId)).then(
    user => {
      if(user){
        res.render('profile', {
          FirstName: user.FirstName,
          LastName: user.Lastname,
          Email: user.Email,
          UserName: user.UserName
        })
      }else{
        res.send('sorry, user does not exist');
      }
    }
  )}else{
    //redirect to login screen(need full path)
    res.redirect('/users/login');
  }
});



module.exports = router;
