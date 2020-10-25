var express = require('express');
var router = express.Router();

const pets = ['Marley', 'Buddy', 'Waylan', 'Sallie', 'Nilla'];

/* Remember CRUD - Create, Read, Update, Delete is the same as POST, GET, PUT, DELETE */
// notice how POST changes the data in 'pets' array.
router.post('/', function(req, res){
  let bodyPet = req.body;
  if(pets.includes(bodyPet.pet)){
    res.send(`already have a ${bodyPet.pet}, thanks!`)
  }else{
    pets.push(bodyPet.pet);
    // res.send(pets);
    res.render('pets', {title: "Amazing Pets", pets})
  }
  
});
/* GET home page. */
//notice how GET simply fetches a view. Here we can dynamically choose what to display.
router.get('/', function(req, res, next) {
  // let queryName = req.query.pet;
  // if(pets.includes(queryName)) {
  //   res.send(`Yep, that's a  ${queryName} alright!` );
  // }else{
  //   res.send(`${queryName} is not here`);
  // }
  res.render('index', {title: "Amazing Pets"});
});

router.put('/', function(req, res){
  res.send('you successfully executed a PUT route!');
});

router.delete('/', function(req, res){
  res.send('you successfully executed a DELETE route!');
});

module.exports = router;
