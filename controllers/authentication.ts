"use strict"

/*  
    Import npm packages
    I'm using bcrypt to has my passwords. I understand that this is not the strongest password hashing
    function out there, but it is still really strong. 
    I should consider other options as I get more paying users.
*/ 
import * as express from 'express';
import * as moment from 'moment';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcrypt-nodejs';
import * as randToken from 'rand-token';
import * as dotenv from 'dotenv';

/*
    Import any application utilities
*/
import { Security } from '../utilities/security';

/*
    Import type interfaces
*/
import * as types from '../typeDefinitions/types';

/*=====================Configuration======================*/

dotenv.config({ path: '.env' });
let authRouter = express.Router();
let security = new Security()

/*=====================Functions==========================*/

/**
 * Create JWT
 *
 * @description Encodes a json web token
 * @param user types.RawUserObject
 * @return a json web token string
 */
let createJWT = (user: types.IRawUserObject): string => {
  let payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, 'day').unix()
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
}

/**
 * Get Safe User
 * 
 * @description Creates the user object to send to the front-end
 * @param user types.RawUserObject
 * @returns User object with type: types.UserObject
 */
let getSafeUser = (req: types.expressRequest, user: types.IRawUserObject): types.IUserObject => {
  let authorized_user = {
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    token: createJWT(user)
  }
  req.user = authorized_user
  return authorized_user
}

/**
 * Login User
 * 
 * @description Logs in a user, stores their information in a json web token
 * @param req express.Request
 * @param res express.Response
 */
let login = (req: types.expressRequest, res: express.Response) => {

  /*
      Grab our database instance
  */
  let db = req.app.get('db');

  /*
        Tries to find a user with the provided email. If one does not exist then sends a message stating
        that email/password is invalid (gotta keep it vague)
  */
  db.users.findOne({email: req.body.email}).then((result: types.IRawUserObject) => {

      if (!result) 
      {
        res.send({
          message: 'Invalid email and/or password'
        })
      }

      /*
          If the user has yet to validate their email, then throw a message
          stating they have yet to validate their email
          TODO: Maybe have an option for them to request a new verification email
      */
      else if (!result.email_validated) res.send({
          validated: false,
          message: 'User is not validated. Please validate your email'
      })

      /*
          If a user exists, then:
            grab their password
            compare that to the password provided
            if it matches then create a json web token for the user
            else send a 401 error
      */
      else if (result) 
      { 
        security.compare(req.body.password, result.password).then(passwordIsCorrect => {
          if (passwordIsCorrect) res.send( getSafeUser(req, result) )
            else res.send({
              message: 'Invalid email and/or password'
            })
        })
      }
    })
  }

  /**
   * Register New User
   * 
   * @description Adds a new user to the database if that user doesn't already exist
   * @param req express.Request
   * @param res express.Response
   * @param next express.NextFunction
   */
let registerNewUser = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {

  /*
      Grab our database instance
  */
  let db = req.app.get('db');

  /*
      Tries to find a user with the provided email. If one exists then sends a message stating
      that email is already taken
  */
  db.users.findOne({ email: req.body.email }).then((result: types.IRawUserObject) => {

    if (result)
    {
      res.status(409).send({ message: 'Email is already taken' })
    }
    else 
    { 

      /*
          Encrypt the provided password
          Insert new user information into the users table in the database
      */
      let token: string = randToken.generate(16);

      security.hash(req.body.password).then(resultingHash => {
        let passwordHash = resultingHash

        security.hash(req.body.phoneNumber).then(resultingHash => {
          let phoneHash = resultingHash

          /*
              Insert the user into the database
          */
          db.users.insert({
            email: req.body.email,
            password: passwordHash, 
            firstname: req.body.firstName, 
            activated: 'FALSE',
            email_validated: 'FALSE',
            validation_token: token,
            phone_number: phoneHash,
            level: 2
          }).then((result: types.IRawUserObject) => {

              /* 
                  Send the logged in user information to the front end
              */
              res.send( getSafeUser(req, result) )

          }).catch((err: types.IError) => {
            console.log(err)
          })
        })
      })
    }
  }).catch((err: types.IError) => {
    console.log(err)
  })
}

let registerAddedUser = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {

}

/*===========================Endpoints============================*/

  authRouter.post('/login', login);
  authRouter.post('/register', registerNewUser);

  export = authRouter;