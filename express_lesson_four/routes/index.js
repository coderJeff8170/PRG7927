var express = require('express');
var router = express.Router();
const mysql = require('mysql');

//home
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'T0rn1d0_!',
//   database: 'sakila'
// });

//work
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
const query = `SELECT * from actor LIMIT 10`;

connection.query(query, (err, results) => {
  if(err) {
    console.err(err.message);
    return;
  }
  console.log(results);
})

/* GET Actor. */
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

module.exports = router;
