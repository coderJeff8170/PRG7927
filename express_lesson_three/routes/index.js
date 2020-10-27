var express = require('express');
var router = express.Router();
var users = require('../models/users');

/* /:id here is a parameter - whatever is passed in, if it matches the id of an item in /models/users, it'll pass information about that particular item to the render function via a variable, user - remember { user } is shorthand for { user: user } */
router.get('/person/:id', function(req, res, next) {
  let user = users.people.find(person => {
    return person.id === parseInt(req.params.id);
  });
  if(user){
    res.render('index', { user });
  }else{
    res.send("sorry, can't find that user!");
  }
  
  console.log(req.path);
});

module.exports = router;
