var express = require('express');
var router = express.Router();
var storyParts = require('../models/storyLine');

/* 
For this project, you will be displaying a story using three views. Each view will be named beginning.hbs, middle.hbs, and end.hbs and will be bound to the three URLs: /beginning, /middle, and /end.[X]

Within the routes, you will need to do a .find() based on the object's storyPart (see objects below)
These URLs should each be within their own GET method in routes/index.js. -uuuuuuh. I made it more DRY.

Step 3
As for the content of the views, display the values within the objects below.

Each of the below objects should exist within an array named storyLine in a file named models/storyLine.js.[X]
The beginning.hbs file should display the information from the below object:
{
    storyPart: "beginning",
    name: "Rupert",
    animal: "fox",
    age: 8
}[X]
When showing the above data, beginning.hbs should read "Once upon a time, there was a fox named Rupert. He was only 8 years old, but he loved to travel."[X]
Use handlebars {{}} to display the data.[X]
The middle.hbs file should display the information from the below object:
{   
    storyPart: "middle",
    place: "France",
    travelVehicle: "train",
    yearsToStay: 2
}[X]
When showing the above data, middle.hbs should read "One day, Rupert decided to visit France. So, he hopped on a train to get there. Once he got there, he decided to stay for at least 2 years."
Use handlebars {{}} to display the data.[X]
The end.hbs file should display the information from the below object:
{
    storyPart: "end",
    foxWife: "Amelie",
    housing: "a house next to the Eiffel Tower"
}[X]
When showing the above data, end.hbs should read "After a while, Rupert met a beautiful fox named Amelie. They fell deeply in love and lived in a house next to the Eiffel Tower. They lived there happily ever after. The end."
Use handlebars {{}} to display the data.[X]
Step 4
Each of the Handlebar views should include an HTML tag that links to the other pages so when you visit /beginning page, there should be a hyperlink which is pointing at /middle. Additionally, there should be a hyperlink on the /middle page which points to the /end page.[X]
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:part', function(req, res, next) {
    let storySection = storyParts.storyLine.find(piece => {
        return piece.storyPart === req.params.part
    });
    if(storySection){
        switch(storySection.storyPart){
            case 'beginning':
                res.render('beginning', { storySection });
                break;
            case 'middle':
                res.render('middle', { storySection });
                break;
            case 'end':
                res.render('end', { storySection });
                break;
        }
    }
});

// router.get('/beginning', function(req, res, next) {
//     // res.render('beginning', { title: 'Express' });
//     let storyPart = storyParts.storyLine.find(part => )
//   });

// router.get('/middle', function(req, res, next) {
// res.render('middle', { title: 'Express' });
// });

// router.get('/end', function(req, res, next) {
//     res.render('end', { title: 'Express' });
//     });

module.exports = router;
