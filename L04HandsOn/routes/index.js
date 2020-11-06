const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/*Add the connection information to the database in your routes/index.js file.[X]

Step 3
Create a route of /film to list out all film titles in the database onto the page.

You will need a SQL query for this
For this, create a new view named film.hbs
Step 4
Create another route of /film/:id that will list the corresponding film title and actor names associated with that film onto the page.

For this, create a new view named filmDetails.hbs
NOTE: Your SQL query will need to use JOIN statements between the film, film_actor, and actor tables. There is a many to many relationship between actors and films.*/

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'sakila'
});

connection.connect((err) => {
  if(err){
    console.log(err.message);
    return;
  }
  console.log("you're connected buddy!!");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
