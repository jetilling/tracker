import * as express from 'express';
import * as moment from 'moment';
import * as jwt from 'jwt-simple';
import * as argon2 from 'argon2';

import * as types from '../typeDefinitions/types';
import * as utilTypes from '../typeDefinitions/utilTypes'

export class Security implements utilTypes.ISecurity {

  hash = (itemToEncrypt: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const hashOptions = {
        timeCost: 4, memoryCost: 13, parallelism: 2, type: argon2.argon2id
      };

      argon2.hash(itemToEncrypt, hashOptions).then((hash: string) => {
          resolve(hash)
      })
    })
  }

  compare = (itemToCheck: string, itemToCheckAgainst: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      argon2.verify(itemToCheck, itemToCheckAgainst).then((passwordIsCorrect: boolean) => {
        resolve(passwordIsCorrect)
      }).catch((err) => console.log(err))
    })

  }

  ensureAuthenticated = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {
    if (!req.header('Authorization')) {
      return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.header('Authorization');
    var payload = null;
    try {
      payload = jwt.decode(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
      return res.status(401).send({ message: err.message });
    }
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired' });
    }
    req.user = payload.sub;
    next();
  }

}