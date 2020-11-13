var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const models = require('../models');

/*
Requirements
Step 1
To begin, generate a new project (within the Express-Course directory) using the Express/Handlebar generator.[X]

Call this app L05HandsOn[X]
Don't forget to run npm install[X]
Install and run Nodemon[X]
Install and require mysql2[X]
Install Sequelize[X]
Use the sequelize init command to complete the setup of your project.[X]
Step 2
You will be using the sakila database for this hands-on.

Create a new model file for the "category" table using the sequelize-auto command.[X]
This file should be named category.js and put inside of the models folder[X]
Change your config.json file to reflect the connection and dialect for the development object[X]
Add the code to your app.js to sync your models and Sequelize[X]
Step 3
Run the necessary command to create an initial migration with the new category model[X]
Add a new column to your category model called default_price that is a decimal type[X]
This column will be used for storing default rental prices for movies within that category
Use the sequelize-auto-migration command to generate a new migration[X]
Run the migration[X]
Write the code to display all category names and their default prices.[X]
You will need a new hbs file and a get() route[X]

Write the code to add a new category to the database
Have a field for the category name and the default price[X]
You will need to add a form to the hbs file and a post() route

Write the code to display a category based on its ID
You will need a new hbs file and a get() route using :id */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
