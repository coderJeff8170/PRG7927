var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
//import db models - up a directory and inside one
const models = require('../models');

/*
Requirements
Step 1
Write the code needed to return all films in the database with a proper RESTful request.[X]
Accomplish this in a '/films' route [X]
You will need a new films.js routes file [X]
You will need a model for the film table if you have not already created one *created in lesson 6 with actor and film_actor with the hduxot command * [X]
Step 2
Create a route that will return the details of one film based on it's Id where the Id is passed as part of the route. [X]

Step 3
Be able to "update" a film title[X]

Step 4
Once a film has been updated, re-route back to '/films'[X]
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
