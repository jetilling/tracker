/*
  The purpose of this file is to quickly retrieve information
  for the logged in user
*/

import * as express from 'express';

import * as types from '../typeDefinitions/types';
import * as utilTypes from '../typeDefinitions/utilTypes';
import { reject } from 'q';

export class UserInfo implements utilTypes.IUserInfo {

  userId: number;

  constructor() {
  }

  grabSafeUserInfo = (req: express.Request, userId: number): Promise<types.ISafeUserObject> => {
    return new Promise((resolve, reject) => {

      let db = req.app.get('db')

      db.users.findOne({id: userId})
      .then((userInfo: types.ISafeUserObject) => {
        let userObject = {
          id: userInfo.id,
          email: userInfo.email,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          email_validated: userInfo.email_validated,
          activated: userInfo.activated,
          level: userInfo.level,
        }
        resolve(userObject)
      })
      .catch((err: types.IError) =>  reject(err))
    })
  
  }
}