"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as moment from 'moment';
import * as jwt from 'jwt-simple';
import * as randToken from 'rand-token';
import * as dotenv from 'dotenv';

/*
    Import any application utilities
*/
import { Security } from '../../utilities/security';

/*
    Import type interfaces
*/
import * as types from '../../typeDefinitions/types';
import * as utilTypes from '../../typeDefinitions/utilTypes'

/*=====================Class==========================*/

export class Authenticate
{

  security: utilTypes.ISecurity;

  constructor(){
    dotenv.config({ path: '.env' });
    this.security = new Security()
  }

  /**
   * Create JWT
   *
   * @description Encodes a json web token
   * @param user types.RawUserObject
   * @return a json web token string
   */
  createJWT = (user: types.IRawUserObject): string => {
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
  getSafeUser = (req: types.expressRequest, user: types.IRawUserObject): types.IUserObject => {
    let authorized_user = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      email_validated: user.email_validated,
      activated: user.activated,
      token: this.createJWT(user)
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
  login = (req: types.expressRequest, res: express.Response) => {

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
          this.security.compare(result.password, req.body.password).then(passwordIsCorrect => {
            if (passwordIsCorrect) res.send( this.getSafeUser(req, result) )
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
  registerNewUser = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {

    /*
        Grab our database instance
    */
    let db = req.app.get('db');

    /*
        Tries to find a user with the provided email. If one exists then sends a message stating
        that email is already taken
    */
    db.users.findOne({ email: req.body.email }).then((result: types.IRawUserObject) => {
      let token: string = randToken.generate(16);

      if (result && result.registration_complete) {
        res.status(409).send({ message: 'Email is already taken' })
      }
      // else if (result && !result.registration_complete) {

      // }
      else { 

        /*
            Encrypt the provided password
            Insert new user information into the users table in the database
        */
        this.hashPasswordAndAddUser(req, res, token, result).then((user: types.IRawUserObject) => {
          res.send( this.getSafeUser(req, user) )
        })
        
      }
    }).catch((err: types.IError) => {
      console.log(err)
    })
  }

  /*=====================Helper Function==========================*/

  private hashPasswordAndAddUser = (req: types.expressRequest, res: express.Response, token: string, user: types.IRawUserObject): Promise<types.IRawUserObject> => {
    return new Promise((resolve, reject) => {
      let db = req.app.get('db');

      this.security.hash(req.body.password).then((resultingHash: string) => {
        let passwordHash: string = resultingHash

        this.security.hash(req.body.phoneNumber).then((resultingHash: string) => {
          let phoneHash: string = resultingHash

          let newUser: types.IRawUserObject = {
            email: req.body.email,
            password: passwordHash, 
            firstname: req.body.firstName, 
            lastname: req.body.lastName,
            activated: false,
            email_validated: false,
            validation_token: token,
            phone_number: phoneHash,
            level: 2,
            registration_complete: true
          }

          if (user && !user.registration_complete) {
            newUser.id = user.id
            newUser.email_validated = true,
            newUser.activated = true
            db.users.update(newUser).then((result: types.IRawUserObject) => {
              /* 
                  Send the logged in user information to the front end
              */
              resolve(result)
              
            }).catch((err: types.IError) => {
              console.log(err)
            })
          }
          else {
            db.users.insert(newUser).then((result: types.IRawUserObject) => {
              /* 
                  Send the logged in user information to the front end
              */
              resolve(result)
              
            }).catch((err: types.IError) => {
              console.log(err)
            })
          }

              
        })
      })
    })
  }
}
