var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

//
router.get('/', function(req, res, next) {
    res.render('categories', { title: 'Categories' });
  });
  
  module.exports = router;