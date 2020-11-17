var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const models = require('../models');

//render all categories to the categories page
router.get('/', function(req, res, next) {
    models.category.findAll({})
    .then(allCategories=>
      res.render('categories', {
        category: allCategories
      }));
    //res.render('categories', { title: 'Categories' });
});

//post route to handle a new added category
router.post('/', function(req, res, next){
  console.log(req.body.name);
  models.category.findOrCreate({
    where: {
      name: req.body.name,
      default_price: req.body.price
    }
  })
  .spread(function(result, created){
    if(created){
      res.redirect('/categories');
    } else {
      res.send('This category already exists');
    }
  });
});

//route to display category on it's id:
router.get('/:id', function(req, res, next){
  let categoryId = parseInt(req.params.id);
  models.category.findOne({
    where: {
      category_id: categoryId
    }
  })
  .then(categoryFound => {
    res.render('category', {
      name: categoryFound.name,
      price: categoryFound.default_price
    })
  })

})


  module.exports = router;