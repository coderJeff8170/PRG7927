var express = require('express');
var router = express.Router();
const models = require('../models');
var authService = require('../services/auth');
const { post } = require('./users');

/* GET posts page. */
//secure this route

router.get('/', function (req, res, next) {
  let token = req.cookies.jwt;
  if(token){
    authService.verifyUser(token)
    .then(user => {
      //if verified
      if (user) {
        models.posts.findAll({ where: { Deleted: false } })
        .then(posts => {
            //now I need to provide a posts object to the page for iteration
            res.render('posts', {
              posts: posts,
              user: user
            });
        });
      } else {
        res.status(401);
        res.send('Invalid authentication token');
      }
    });
  }else{
    res.send('not logged in');
  }
  });


//Create new post
router.post('/', function(req, res, next){
    //get the token from the request
  let token = req.cookies.jwt;
  //if there is one
  if (token) {
    authService.verifyUser(token)
    .then(user => {
      models.posts.create({
        PostTitle: req.body.title,
        PostBody: req.body.body,
        UserId: user.UserId
      })
    })
    .then(result => {
      res.redirect('/posts');
    })
  }
});

module.exports = router;