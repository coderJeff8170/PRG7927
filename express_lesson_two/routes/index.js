var express = require('express');
var router = express.Router();

const pets = ['Marley', 'Buddy', 'Waylan', 'Sallie', 'Nilla'];

/* Remember CRUD - Create, Read, Update, Delete is the same as POST, GET, PUT, DELETE */
router.post('/', function(req, res){
  res.send('you successfully executed a POST route!');
});
/* GET home page. */
router.get('/', function(req, res, next) {
  let queryName = req.query.pet;
  if(pets.includes(queryName)) {
    res.send(`Yep, that's a  ${queryName} alright!` );
  }else{
    res.send(`${queryName} is not here`);
  }
  
});

router.put('/', function(req, res){
  res.send('you successfully executed a PUT route!');
});

router.delete('/', function(req, res){
  res.send('you successfully executed a DELETE route!');
});

module.exports = router;
