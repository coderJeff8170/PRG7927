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

//TODO: Edit route. tch. need info about post to be edited to be passed to this view.
//TEST THIS
router.get('/edit/:id', function(req, res, next){
  let postId = parseInt(req.params.id);
  //get post where id matches
  models.posts.findOne({where: {
    PostId: postId
  }})
  .then(post => {
    res.render('editpost', {
      post: post
    })
  })
})

//TODO: Edit post - need an update page, then this handles the body of that
router.put('/:id', function(req, res, next){
  //res.send(`this button is going to delete post id${req.params.id}`);
  let postId = parseInt(req.params.id);
  models.posts.update({ 
    PostTitle: req.body.title,
    PostBody: req.body.body
  }, { where: {
    PostId: postId
  }})
  .then(
    res.redirect(`/posts`)
  )
  .catch(err => {
    res.status(400);
    res.send('Houston, we have a problem!');
  });
});


//GET 'DELETE' post:
//since this button is only viewable as admin, we can just add functionality
router.get('/:id', function(req, res, next){
  //res.send(`this button is going to delete post id${req.params.id}`);
  let postId = parseInt(req.params.id);
  models.posts.update({ Deleted: true }, { where: {
    PostId: postId
  }})
  .then(
    res.redirect(`/posts`)
  )
  .catch(err => {
    res.status(400);
    res.send('Houston, we have a problem!');
  });
});

module.exports = router;