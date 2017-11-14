"use strict";
/*
    Import npm packages
    I'm using bcrypt to has my passwords. I understand that this is not the strongest password hashing
    function out there, but it is still really strong.
    I should consider other options as I get more paying users.
*/
var express = require("express");
var moment = require("moment");
var jwt = require("jwt-simple");
var randToken = require("rand-token");
var dotenv = require("dotenv");
/*
    Import any application utilities
*/
var security_1 = require("../utilities/security");
/*=====================Configuration======================*/
dotenv.config({ path: '.env' });
var authRouter = express.Router();
var security = new security_1.Security();
/*=====================Functions==========================*/
/**
 * Create JWT
 *
 * @description Encodes a json web token
 * @param user types.RawUserObject
 * @return a json web token string
 */
var createJWT = function (user) {
    var payload = {
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(14, 'day').unix()
    };
    return jwt.encode(payload, process.env.TOKEN_SECRET);
};
/**
 * Get Safe User
 *
 * @description Creates the user object to send to the front-end
 * @param user types.RawUserObject
 * @returns User object with type: types.UserObject
 */
var getSafeUser = function (user) {
    return {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        token: createJWT(user)
    };
};
/**
 * Login User
 *
 * @description Logs in a user, stores their information in a json web token
 * @param req express.Request
 * @param res express.Response
 */
var login = function (req, res) {
    /*
        Grab our database instance
    */
    var db = req.app.get('db');
    /*
          Tries to find a user with the provided email. If one does not exist then sends a message stating
          that email/password is invalid (gotta keep it vague)
    */
    db.users.findOne({ email: req.body.email }).then(function (result) {
        if (!result) {
            res.send({
                message: 'Invalid email and/or password'
            });
        }
        else if (!result.email_validated)
            res.send({
                validated: false,
                message: 'User is not validated. Please validate your email'
            });
        else if (result) {
            security.decrypt(req.body.password, result.password).then(function (passwordIsCorrect) {
                if (passwordIsCorrect)
                    res.send(getSafeUser(result));
                else
                    res.send({
                        message: 'Invalid email and/or password'
                    });
            });
        }
    });
};
/**
 * Register New User
 *
 * @description Adds a new user to the database if that user doesn't already exist
 * @param req express.Request
 * @param res express.Response
 * @param next express.NextFunction
 */
var register = function (req, res, next) {
    /*
        Grab our database instance
    */
    var db = req.app.get('db');
    /*
        Tries to find a user with the provided email. If one exists then sends a message stating
        that email is already taken
    */
    db.users.findOne({ email: req.body.email }).then(function (result) {
        if (result) {
            res.status(409).send({ message: 'Email is already taken' });
        }
        else {
            /*
                Encrypt the provided password
                Insert new user information into the users table in the database
            */
            var token_1 = randToken.generate(16);
            security.encrypt(req.body.password).then(function (hash) {
                var passwordHash = hash;
                security.encrypt(req.body.phoneNumber).then(function (hash) {
                    var phoneHash = hash;
                    /*
                        Insert the user into the database
                    */
                    db.users.insert({
                        email: req.body.email,
                        password: passwordHash,
                        firstname: req.body.firstName,
                        activated: 'FALSE',
                        email_validated: 'FALSE',
                        validation_token: token_1,
                        phone_number: phoneHash,
                        level: 2
                    }).then(function (result) {
                        /*
                            Send the logged in user information to the front end
                        */
                        res.send(getSafeUser(result));
                    }).catch(function (err) {
                        console.log(err);
                    });
                });
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
};
/*===========================Endpoints============================*/
authRouter.post('/login', login);
authRouter.post('/register', register);
module.exports = authRouter;
//# sourceMappingURL=authentication.js.map