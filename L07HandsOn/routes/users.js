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

// Show a list of users: /users GET
// (if logged in and admin)
router.get('/', function(req, res, next){
    //remember, passport is gonna add a user property to the req
    if(req.user && req.user.admin){
        models.users.findAll({})
        .then(users => {
            res.render('/users', {
                users: users
            });
        });
    }else{
        res.send('invalid request');
    }
});

// Show a specific user: /users/:id GET

// Delete user: /users/:id DELETE (only if logged in and admin)

module.exports = router;
