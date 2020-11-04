var express = require('express');
var router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'T0rn1d0_!',
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
  if(err) throw err;
  
  console.log(results);
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
