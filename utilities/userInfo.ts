/*
  The purpose of this file is to quickly retrieve information
  for the logged in user
*/

import * as express from 'express';

import * as types from '../typeDefinitions/types';
import * as utilTypes from '../typeDefinitions/utilTypes';

export class UserInfo implements utilTypes.IUserInfo {

  userId: number;

  constructor(id: number) {
    this.userId = id
  }

  grabSafeUserInfo = (req: express.Request): Promise<types.ISafeUserObject> => {
    return new Promise((resolve, reject) => {

    let db = req.app.get('db')

    db.users.findOne({id: this.userId})
    .then((userInfo: types.ISafeUserObject) => {
      resolve(userInfo)
    })
    .catch((err: types.IError) =>  reject(err))
  })
  
  }
}