var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const models = require('../models');

//
router.get('/', function(req, res, next) {
    
    models.category.findAll({})
    .then(allCategories=>
      res.render('categories', {
        category: allCategories
      }));
    //res.render('categories', { title: 'Categories' });
  });

  module.exports = router;