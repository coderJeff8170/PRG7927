//setup json web tokens here
const jwt = require('jsonwebtoken');
const models = require('../models');
const bcrypt = require('bcryptjs');

//takes in user info and encrypts it using a secret key string that can be whatever you need
//it to be. jwt.sign takes in the user, a secret key, and an expiration time as params

var authService = {
    signUser: function(user){
        //creates a token for the user for validation using a word shared between the requestor and responder
        const token = jwt.sign(
            {
                Username: user.Username,
                UserId: user.UserId
            },
            'secretkey',
            {
                expiresIn: '1h'
            }
            );
        return token;
    },
    verifyUser: function(token){
        //token validation proves user is who they say they are
        try{
            let decoded = jwt.verify(token, 'secretkey');//decrypts token using same word as in jwt.sign in sign user function
            return models.users.findByPk(decoded.UserId);//returns decrypted user id from db
        } catch (err){
            console.log(err);
            return null;
        }
    },
    hashPassword: function(plainTextPassword){
        //makes the password illegible to someone looking at database
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    },
    comparePasswords: function(plainTextPassword, hashedPassword){
        //this REHASHES plainTextPassword and compares it to the hashed Password
        return bcrypt.compareSync(plainTextPassword, hashedPassword)
    }
}

module.exports = authService;