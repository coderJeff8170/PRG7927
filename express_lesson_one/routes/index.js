var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express',
                        users: [
                          'Jeffrey', 'Jennifer', 'Joan', 'Sophia', 'Nilla', 'Marley', 'Buddy', 'Waylan', 'Colin', 'Sallie', 'Ella-Blue'
                                ],
                        cats: [
                          {name: 'Nelson'},
                          {name: 'Chloe'},
                          {name: 'Miss Kitty'},
                          {name: 'Gypsy'},
                          {name: 'Cougar Anne'},
                          {name: 'Mamma Cat'},
                          {name: 'Sallie'},
                          {name: 'Waylan'}
                        ]
                              });
});

module.exports = router;
