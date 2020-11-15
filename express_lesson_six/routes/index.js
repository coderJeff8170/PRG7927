var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
//import db models - up a directory and inside one
const models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




module.exports = router;
