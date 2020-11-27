//Basically creates a user object on the request for the length of a session
//if a user object is granted to the request, the login must have been successful?

// Bring in the required libraries
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');

// Configure the login validation
// define how to query the database and validate the user credentials. You are checking for both the username and password to match what is being sent against the database
passport.use(
    'local',
    new LocalStrategy(function (username, password, done) {
      models.users.findOne({ where: { Username: username } })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (user.Password !== password) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        })
        .catch(err => {
          if (err) { return done(err); }
        });
    })
  );
  
  // Stores the user id in the user session
  passport.serializeUser((user, callback) => {
    callback(null, user.UserId);
  });
  
  // Queries the database for the user details and adds to the request object in the routes
  // Much like you have access to params and body of the req object, you now have a user property on the req object in your routes
  passport.deserializeUser((id, callback) => {
    models.users
      .findByPk(id)
      .then(user => callback(null, user))
      .catch(err => callback(err));
  });
  
  module.exports = passport;