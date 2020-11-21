var express = require('express');
var router = express.Router();
const models = require('../models');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//render the signup page
router.get('/signup', function(req, res, next){
    res.render('signup');
  });
//create a user with a POST route
// I guess by email since there's no username column so email = username
//nope you forgot the username column!! model/migration
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
})

//POST login information
//show individual user profile
router.post('/login', function(req, res, next){
    models.users.findOne({
        where: {
            Username: req.body.username,
            Password: req.body.password
        }
    })
    .then(user => {
        if(user){
            res.render('profile', {
                firstname: user.FirstName,
                lastname: user.LastName,
                email: user.Email,
                username: user.Username,
            });
        }else{
            res.send('wrong login info');
        }
    });
});



// Show a list of users: /users GET
// (if logged in and admin)
router.get('/', function(req, res, next){
    //remember, passport is gonna add a user property to the req
        models.users.findAll()
        .then(allUsers => {
            res.render('users', {
                users: allUsers
            });
        });

});

// Show a specific user: /users/:id GET
router.get('/:id', function(req, res, next){
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
});

// Delete user: /users/:id DELETE (only if logged in and admin)
router.delete('/:id', function(req, res, next){
    console.log("button works");
})

router.delete('/:id', function (req, res, next) {
    let userId = parseInt(req.params.id);
    models.users
    .destroy( { where: { UserId : userId } })
    .then(result => {
      //just redirects back to all actors, since this actor no longer exists!
      res.redirect('/actors');
    })
    .catch(err => {
      res.status(400);
      res.send("You're having trouble deleting this person!")
    })
  });

module.exports = router;
