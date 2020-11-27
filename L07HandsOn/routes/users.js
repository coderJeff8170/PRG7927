var express = require('express');
var router = express.Router();
const models = require('../models');
const passport = require('../services/passport');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//render the signup page
router.get('/signup', function(req, res, next){
    res.render('signup');
  });
//create a user with a POST route
router.post('/signup', function(req, res, next){
    models.users.findOrCreate({
        where:{
            Username: req.body.username
        },
        defaults:{
            FirstName: req.body.firstname,
            LastName: req.body.lastname,
            Email: req.body.email,
            Username: req.body.username,
            Password: req.body.password
        }
    })
    .spread(function(result, created){
        if(created){
            res.send('user successfully created');
        }else{
            res.send('this username already in use');
        }
    });
});

//render login page
router.get('/login', function(req, res, next){
    res.render('login');
});

//when user hits login button, authenticate with passport
//change to used passport
router.post('/login', passport.authenticate('local', {
    failureRedirect: 'login'
}),
function(req, res, next){
    //res.redirect(`/profile/${req.user.UserId}`);
    res.redirect('profile');//ok!
});


//render individual user profile if user is authenticated
router.get('/profile', function(req, res, next){
    if(req.user){
        //if req.user exists(meaning logged in), find user by id,
        models.users.findByPk(parseInt(req.user.UserId)).then(
            user => {
                if(user){
                    //if found, render profile
                    res.render('profile', {
                        firstname: user.FirstName,
                        lastname: user.LastName,
                        email: user.Email,
                        username: user.Username
                    });
                }else{
                    //if not, say user doesn't exist
                    res.send('sorry, user does not exist');
                }
            });
    }else{
        //if req.user isn't logged in, return to login page
        res.redirect('login');
    } 
});





// Show a list of users: /users GET ( only if logged in and admin)
router.get('/', function(req, res, next){
    //remember, passport is gonna add a user property to the req
    //if(req.user && isAdmin<= how?){
    if(req.user && req.user.Admin){
        models.users.findAll({
            where: {
                deleted: false
            }
        })
        .then(allUsers => {
            res.render('users', {
            users: allUsers
            });
        });
    }else if (req.user){
        res.send(`Sorry ${req.user.Username}, you are not authorized to see all users.`);
    } else {
        res.render('login');
    }  
});

//Show a specific user: /users/:id GET only if user and admin
router.get('/:id', function(req, res, next){
    if(req.user && req.user.Admin){
        models.users.findByPk(parseInt(req.params.id))
        .then(user => {
            if(user){
                res.render('profile', {
                    firstname: user.FirstName,
                    lastname: user.LastName,
                    email: user.Email,
                    username: user.Username
                })
            }else{
                res.send('something went awry!')
            }
        });
    }
});

// Delete user: /users/:id DELETE (only if logged in and admin)
router.post('/:id', function(req, res, next){
    
    let userId = parseInt(req.params.id);

      models.users
      .update({ Deleted: true }, { where: {
          UserId: userId
      }})
      .then(
        res.redirect(`/users`)
      )
      .catch(err => {
        res.status(400);
        res.send('Houston, we have a problem!');
      });
})

// router.delete('/:id', function (req, res, next) {
//     let userId = parseInt(req.params.id);
//     models.users
//     .destroy( { where: { UserId : userId } })
//     .then(result => {
//       //just redirects back to all users, since this user no longer exists!
//       res.redirect('/');
//     })
//     .catch(err => {
//       res.status(400);
//       res.send("You're having trouble deleting this person!")
//     })
//   });

module.exports = router;
