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

Step 3 [X]
In the get method, check to see and respond accordingly that if you have a certain flower, send back a message saying "Yes, we have [flower] in our garden" and if you don't, respond, "Nope, we do not have [flower] in our garden, but maybe we should plant it!".

Hint! Use .includes().

Step 4 [X]
Create a post method that will add a flower that is not in the array into it and will respond, "We already have that flower, no need to add it" if it already exists in the array.

Step 5 [X]
Use Postman to check and see that these are returning the correct messages based on the HTTP verb.
*/


let flowers = ["Orchid", "Iris", "Hydrangea", "Amaryllis", "Dahlia", "Daffodil", "Bleeding Heart"];

/* GET home page. */
router.get('/', function(req, res, next) {
  //in GET, we use the request query to pass information
  //in Postman testing, this takes the form of "?flower=daisy" in the url or
  //a key:value pair in the params section
  let flowerReq = req.query.flower;
  if(flowers.includes(flowerReq)){
    res.send(`Yes, we have ${flowerReq} in our garden`);
  }else{
    res.send(`Nope, we do not have ${flowerReq} in our garden, but maybe we should plant it!`);
  }
});



//in Postman testing, without a form, you must simulate a form 
//by formatting a raw JSON object for it to show up
router.post('/', function(req, res, next) {
  //in POST, we use the body of the request to pass information
  let flowerReq = req.body;
  if(flowers.includes(flowerReq.flower)){
    res.send(`We already have ${flowerReq.flower}, no need to add it`)
  }else{
    flowers.push(flowerReq.flower);
    res.send(flowers);
  }
});

module.exports = router;
