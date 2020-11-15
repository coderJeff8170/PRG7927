const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const models = require('../models');

//Write the code needed to return all films in the database with a proper RESTful request.
// remember, / just adds on to /films from app.js
router.get('/', function(req, res, next){
    models.film.findAll({})
    .then(filmsFound => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(filmsFound));
    })
    .catch(err => {
        res.status(400);
        res.send(`something went terribly wrong.
        ${err.message}`);
    })
});
//Create a route that will return the details of one film based on it's Id where the Id is passed as part of the route.
router.get('/:id', function(req, res, next){
    let filmId = parseInt(req.params.id);
    models.film.findOne({
        where: { 
            film_id : filmId
        }
    })
    .then(filmFound => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(filmFound));
    })
    .catch(err =>{
        res.status(400);
        res.send(`something went drastically wrong with your request!
        ${err.message}`);
    });
});
//Be able to "update" a film title
router.put('/:id', function(req, res, next){
    let filmId = parseInt(req.params.id);
    models.film.update(req.body,
        { where : {
            film_id : filmId
        }}
    )
    .then(result => {
        //res.redirect(`/films/${filmId}`); <= this is better for checking result IMHO
        res.redirect('/films');
    })
    .catch(err => {
        res.status(400);
        res.send(`the update failed!
        ${err.message}`);
    })
});


module.exports = router;