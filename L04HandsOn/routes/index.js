const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/*Add the connection information to the database in your routes/index.js file.[X]

Step 3
Create a route of /film to list out all film titles in the database onto the page.[X]

You will need a SQL query for this
For this, create a new view named film.hbs[X]
Step 4
Create another route of /film/:id that will list the corresponding film title and actor names associated with that film onto the page.[X]

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

//GET film page
router.get('/film', function(req, res, next) {
  const filmList = `SELECT * FROM film`
  // res.send('working');
  connection.query(filmList, (err, result)=>{
    if(err){
      console.err(err.message);
      return;
    }else{
      res.render('film', {
        film: result
      })
    }
  })
});

//GET film information
router.get('/film/:id', function(req, res, next) {
  const filmId = parseInt(req.params.id);
  console.log(filmId);
  // const filmIdQuery = `SELECT * FROM film WHERE film_id = ${filmId}`;
  // const filmIdQuery = `
  // SELECT first_name, last_name, title FROM actor
  // JOIN film_actor ON actor.actor_id=film_actor.actor_id
  // JOIN film ON film.film_id=film_actor.film_id
  // WHERE film.film_id = ${filmId}`;
  const filmIdQuery = `
  SELECT first_name, last_name, film.title, film_text.description FROM actor
  JOIN film_actor ON actor.actor_id=film_actor.actor_id
  JOIN film ON film.film_id=film_actor.film_id
  JOIN film_text ON film.film_id=film_text.film_id
  WHERE film.film_id = ${filmId}`;

  console.log(filmIdQuery);

  connection.query(filmIdQuery, (err, result)=>{
    if(err){
      console.err(err.message);
      return;
    }else{
      if(result.length>0){
        console.log(result);
        res.render('filmDetails', {
          film: result,
          title: result[0]
        })
      }else{
        res.send('no such film exists!');
      }
    }
  })
});

module.exports = router;
