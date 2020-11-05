var express = require('express');
var router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'sakila'
});

connection.connect(function(err){
  if(err){
    console.log(err);
    return;
  }
  console.log('you are now connected!')
})
// use the backticks!
// const query = `SELECT * from actor LIMIT 10`;

// connection.query(query, (err, results) => {
//   if(err) {
//     console.err(err.message);
//     return;
//   }
//   console.log(results);
// })

//Get root
router.get('/', function(req, res, next){
  res.send('basic page');
});

/* GET Actor/id. */
router.get('/actor/:id', function(req, res, next) {
  let actorId = parseInt(req.params.id);
  console.log(actorId);
  let idQuery = `SELECT * from actor WHERE actor_id=${actorId}`;
  console.log(idQuery);

  connection.query(idQuery, (err, result) => {
    console.log(result);
    if(result.length>0){
      res.render( 'index', {
        actor: result[0]
      });
    }else{
      res.send('no such actor!');
    }
  });
});

//why is this global?
const actorList = `SELECT * from actor`;

//GET Actor
router.get('/actor', function(req, res, next){
  connection.query(actorList, (err, result) =>{
    res.render( 'actor', {
      actor: result
    })
  });
});

//POST Actor - for the form submission
router.post('/actor', function(req, res, next){
  console.log(req.body);
  //object to contain data from form submit
  let newActor = {
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }
  //new query to :
  const selectActor = `
    SELECT * 
    FROM actor 
    WHERE first_name = '${newActor.first_name}' 
    AND last_name = '${newActor.last_name}'`;

  connection.query(selectActor, function(err, result){
    if(err){
      //if there's an error, show an error message
      console.log(err.message)
    }else{
      //or else, if something's returned, it means the same name exists
      //send a message saying so
      if(result.length > 0){
        res.send('sorry, an actor by that name already exists!');
        //is there a way to send this back to original page after a couuple seconds??
      }else{
        //if actor doesn't exist, insert actor into database
        let newActorQuery = `
        INSERT INTO actor
        (first_name, last_name) values
        ('${newActor.first_name}', '${newActor.last_name}')`;
        //using this connection query vv
        connection.query(newActorQuery, function(err, insertResult ){
          //just calling connection.query executes the first param, so
          //if there's an error:
          if(err){
            res.render('error', { message: err.message })
          }else{
            //else redirect back to actor page after query success....
            res.redirect('/actor');
          }
        });
      }
    }
  })

});

module.exports = router;
