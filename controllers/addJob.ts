"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as massive from 'massive';
import * as dotenv from 'dotenv';

/*
    Import type interfaces
*/
import * as types from '../typeDefinitions/types';

/*=====================Configuration======================*/

dotenv.config({ path: '.env' });
let jobRouter = express.Router();

/*=====================Functions==========================*/

let createJob = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let jobTitle = req.body.job;
  let description = req.body.description;

  req.app.get('db').jobs.insert({
    name: jobTitle,
    description: description
  }).then(res.status(200).send({success: true}))
  .catch((err: types.IError) => next(err))
}

/*=====================Helper Function==========================*/


/*===========================Endpoints============================*/

jobRouter.post('/addJob', createJob);

export = jobRouter;