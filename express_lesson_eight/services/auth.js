//setup json web tokens here
const jwt = require('jsonwebtoken');
const models = require('../models');

//takes in user info and encrypts it using a secret key string that can be whatever you need
//it to be. jwt.sign takes in the user, a secret key, and an expiration time as params

var authService = {
    signUser: function(user){
        const token = jwt.sign(
            {
                Username: user.Username,
                UserId: user.UserId
            },
            'secretKey',
            {
                expiresIn: '1h'
            }
            );
        return token;
    }
}

module.exports = authService;