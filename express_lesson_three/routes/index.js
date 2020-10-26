var express = require('express');
var router = express.Router();
var users = require('../models/users');

/* GET home page. */
router.get('/person/:id', function(req, res, next) {
  let person = users.people.find(peep => {
    return peep.id === parseInt(req.params.id);
  });
  res.render('index', { person });
  console.log(req.path);
});

module.exports = router;
