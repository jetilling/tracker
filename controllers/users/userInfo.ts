"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as massive from 'massive';
import * as dotenv from 'dotenv';
import * as moment from 'moment';

/*
    Import any application utilities
*/


/*
    Import type interfaces
*/
import * as types from '../../typeDefinitions/types';

/*=====================Class==========================*/

export class UserInfo {   

  constructor(){
      dotenv.config({ path: '.env' });
  }

  getUserInfo = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  }

  editUserInfo = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  }

  searchUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let searchTerm = req.params.term;

    req.app.get('db').users.search({
      fields: ['firstname', 'lastname', 'phone_number', 'email'], 
      term: searchTerm
    }, {stream: true}
    ).then((userStream: types.IUserObject) => {
      res.send({success: true, data: userStream})
    }).catch((err: types.IError) => next(err));

  }

}

/*=====================Helper Function==========================*/
