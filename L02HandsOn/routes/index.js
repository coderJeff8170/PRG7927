var express = require('express');
var router = express.Router();

/*
Requirements
Step 1 [X]
To begin, generate a new project (within the Express-Course directory) using the Express/Handlebar generator.
Call this app L02HandsOn
Don't forget to run npm install
Install and run Nodemon

Step 2 [X]
Create an array that is named flowers and includes the following elements:
["Orchid", "Iris", "Hydrangea", "Amaryllis", "Dahlia", "Daffodil", "Bleeding Heart"]

Step 3 []
In the get method, check to see and respond accordingly that if you have a certain flower, send back a message saying "Yes, we have [flower] in our garden" and if you don't, respond, "Nope, we do not have [flower] in our garden, but maybe we should plant it!"

Hint! Use .includes().

Step 4 []
Create a post method that will add a flower that is not in the array into it and will respond, "We already have that flower, no need to add it" if it already exists in the array.

Step 5 []
Use Postman to check and see that these are returning the correct messages based on the HTTP verb.
*/


let flowers = ["Orchid", "Iris", "Hydrangea", "Amaryllis", "Dahlia", "Daffodil", "Bleeding Heart"];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Garden' });
});

router.post('/', function(req, res, next) {
  let flowerReq = req.body;
  if(flowers.includes(flowerReq.flower)){
    // res.send(`sorry, we already have a ${flowerReq.flower} in the garden`);
    res.render('flowerPresent', {flower: flowerReq.flower} );
  }else{
    flowers.push(flowerReq.flower);
    res.render('flowerList', {title: 'Flower List', flowers});
  }
  // res.send(flowerReq);
  //console.log(flowerReq.flower);//why this dont work?
});

module.exports = router;
