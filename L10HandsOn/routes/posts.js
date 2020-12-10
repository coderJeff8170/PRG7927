var express = require('express');
var router = express.Router();
const models = require('../models');
var authService = require('../services/auth');
const { post } = require('./users');

/* GET posts page. */
//need to be authenticated to see this:
// router.get('/', function(req, res, next) {
//     res.render('posts', { title: 'Posts' });
//   });

//TODO: secure this route
//TODO: figure out how to get author name in here.
router.get('/', function (req, res, next) {
  let token = req.cookies.jwt;
  if(token){
    //gives us all undeleted posts
    models.posts.findAll({
      where: {
        Deleted: false
      }
    })
    .then(posts => {
      //now I need all users associated with the posts
        models.users.findAll()
        //now I need to provide a posts object to the page for iteration
        .then(users => {
          console.log(users[0])
          res.render('posts', {
            posts: posts
        });
        })
    });
  }else{
    res.send('not logged in');
  }
    
  });

//you're going to have to run a findAll function here lol.
// router.get('/', function (req, res, next) {
//     //get the token from the request
//     let token = req.cookies.jwt;
//     //if there is one
//     if (token) {
//       //verify it
//       authService.verifyUser(token)
//         .then(user => {
//           //if verified
//           if (user) {
//               res.render('posts', { 
//                 title: "Posts",
//                 firstname: user.FirstName
//             });
//           } else {
//             //if unable to verify
//             res.status(401);
//             res.send('Invalid authentication token');
//           }
//         });
//     } else {
//       //if there's no token, they're logged out
//       res.status(401);
//       res.send('Must be logged in');
//     }
//   });

//create new post
// router.post('/', function(req, res, next){
  
//     console.log(user.UserId);
//     models.posts
//     .create({
//         PostTitle: req.body.title,
//         PostBody: req.body.body,
//       })
//       .then(result => {
//         res.redirect('/posts');
//       })
//       .catch(err => {
//         res.status(400);
//         res.send('Houston, we have a problem!');
//       });
//   });


  //create new post
// router.post('/', function(req, res, next){
//   //get the token from the request
//   let token = req.cookies.jwt;
//   //if there is one
//   if (token) {
//     //verify
//     authService.verifyUser(token)
//     .then(user => {
//         //console.log(user);
//         models.posts.create({
//         PostTitle: req.body.title,
//         PostBody: req.body.body,
//         UserId: user.UserId
//       })
//       .then(result => {
//         res.redirect('/posts');
//       })
//       }
    
//   }));

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