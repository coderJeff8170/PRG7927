var express = require('express');
var router = express.Router();
const staticModels = require('../staticModels/planets');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET planets */
router.get('/staticPlanets', function(req, res, next) {
  res.send(JSON.stringify(staticModels.planet));
});

module.exports = router;
