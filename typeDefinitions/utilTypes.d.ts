import * as express from 'express';

import * as types from './types';

export interface ISecurity {
  compare: (hashedPassword: string, userPassword: string) => Promise<boolean>,
  hash: (userPassword: string) => Promise<string>,
  ensureAuthenticated: (req: express.Request, res: express.Response, next: express.NextFunction) => express.Response
}

export interface ITime {
  findDifference: (startTime: string, endTime: string, differenceType: string) => number
}

export interface IUserInfo {
  grabSafeUserInfo: (req: express.Request) => Promise<types.ISafeUserObject>
}