const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const models = require('../models');

//new file created for specific actors route;
//notice route is /, which is added to /actors thru the app.js file
//redirects still need full path

//get information about actors and films
router.get('/', function(req, res, next) {
    models.actor
    //include the films associated with each actor
    .findAll({ 
      attributes: ['actor_id', 'first_name', 'last_name'],
      include: [{ 
        attributes: ['film_id', 'title', 'description', 'rental_rate', 'rating'],
        model: models.film }]})
    .then(actorsFound => {
      //header will come back in html, it'll be easier to read in JSON
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(actorsFound));
    })
  });
  
  // findByPKmethod of parameterized search (useful if your where clause is the PK is)
  router.get('/:id', function(req, res, next){
    models.actor
    .findByPk(parseInt(req.params.id), {
      include: [{ model: models.film }]
    })
    .then(actorFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(actorFound));
    });
  });
  
  // findOne method of parameterized search 
  // router.get('/:id', function(req, res, next){
  //   models.actor.findOne({
  //     include: [{ model: models.film }],
  //     where: { actor_id: parseInt(req.params.id) }
  //   })
  //   .then(actorFound => {
  //     res.setHeader('Content-Type', 'application/json');
  //     res.send(JSON.stringify(actorFound));
  //   });
  // });
  
  //make a new record in the database (this will create a duplicate actor!!)
  // router.post('/', function(req, res, next){
  //   models.actor.create(req.body)
  //     .then(newActor => {
  //       res.setHeader('Content-Type', 'application/json');
  //       res.send(JSON.stringify(newActor))
  //     })
  //     .catch(err => {
  //       res.status(400);
  //       res.send(err.message);
  //     })
  // });
  // need to check to see if actor already exist
    router.post('/', function(req, res, next){
      models.actor.findOrCreate({
        where: {
          first_name: req.body.first_name,
          last_name: req.body.last_name
        }
      })
      .spread(function(result, created){
        if(created){
          res.redirect(`/actors/${result.actor_id}`);
        }else{
          res.status(400);
          res.send('Sorry, this actor already exists');
        }
      });
    });
  
    //update route (individual actor)
    router.put('/:id', function (req, res, next) {
      let actorId = parseInt(req.params.id);
      models.actor
      .update(req.body, { where: { actor_id : actorId } })
      .then(result => {
        res.redirect(`/actors/${actorId}`);
      })
      .catch(err => {
        res.status(400);
        res.send('Houston, we have a problem!');
      })
    });
  
    //delete actor route
    router.delete('/:id', function (req, res, next) {
      let actorId = parseInt(req.params.id);
      models.actor
      //don't need req.body here because you're deleting the whole thing as opposed to updating some portion of it
      .destroy( { where: { actor_id : actorId } })
      .then(result => {
        //just redirects back to all actors, since this actor no longer exists!
        res.redirect('/actors');
      })
      .catch(err => {
        res.status(400);
        res.send("You're having trouble deleting this fella!")
      })
    });


module.exports = router;

