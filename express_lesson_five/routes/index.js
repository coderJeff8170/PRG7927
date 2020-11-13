const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get mutiple actors/render to a web page
// router.get('/actors', function(req, res, next){
//   //order the actors alphabetically
//   models.actor.findAll({
//     order: [ 
//       ['last_name', 'ASC']
//     ]
//   }).then(allActors =>
//     res.render('actors',
//     { 
//       actors: allActors  
//     }
//     ));
// });

//provide RESTful information using the /actors route:
router.get('/actors', function(req, res, next){
  //order the actors alphabetically
  models.actor.findAll({
    order: [ 
      ['last_name', 'ASC']
    ]
  }).then(allActors =>{
    let mappedActors = allActors.map(actor => ({
      ActorID: actor.actor_id,
      ActorName: `${actor.first_name} ${actor.last_name}`
    }));
    //as JSON!
    res.send(JSON.stringify(mappedActors));
  });
});



//individual actor with hard coded id
router.get('/actor', function(req, res, next){
  models.actor.findOne({
    where: {
      actor_id: 2
    }
  }).then(actor =>
    res.render('actor',
    {
      actor: actor
    }));
});
//actor by id - using parameters
router.get('/actor/:id', function(req, res, next){
  let actorId = parseInt(req.params.id);
  models.actor.findOne({
    where: {
      actor_id: actorId
    }
  }).then(actor =>
    res.render('actor', 
    {
      actor: actor
    }));
});
//used to create a new actor, or say that they already exist
router.post('/actor', function(req, res, next){
  console.log(req.body.first_name);
  models.actor.findOrCreate({
    where: {
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }
  })
  .spread(function(result, created){
    if(created){
      res.redirect('/actors');
    } else {
      res.send('This actor already exists');
    }
  });
});

module.exports = router;
