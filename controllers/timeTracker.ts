"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as massive from 'massive';
import * as moment from 'moment';
import * as dotenv from 'dotenv';

/*
    Import type interfaces
*/
import * as types from '../typeDefinitions/types';

/*=====================Configuration======================*/

dotenv.config({ path: '.env' });
let timeRouter = express.Router();

/*=====================Functions==========================*/

let clockIn = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let job = req.body.jobId 
  let time = req.body.time

  req.app.get('db').time.insert({
    job_id: job,
    clock_in: moment(time)
  }).then((time: types.ITimeRaw) => {
    res.send({success: true, timeId: time.id})
  })
  .catch((err: types.IError) => next(err))
}

let clockOut = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let timeId = req.body.timeId 
  let timeOut = req.body.time
  let start: any
  let end: any
  let difference: string
  
  req.app.get('db').time.find({id: timeId})
    .then((time: types.ITimeRaw) => {

      //For what ever reason my response was being wrapped in [ Anonymous {}]...
      start = moment(time[0]['clock_in'])
      end = moment(timeOut)
      difference = moment(end.diff(start)).format("s")

      req.app.get('db').time.update({
        id: timeId,
        clock_out: new Date(timeOut),
        total_time: difference
      }).then((time: types.ITimeRaw) => {
        res.send({success: true, totalTime: difference})
      }).catch((err: types.IError) => next(err))
  

    }).catch((err: types.IError) => next(err))

    

}

/*=====================Helper Function==========================*/


/*===========================Endpoints============================*/

timeRouter.post('/clockin', clockIn);
timeRouter.put('/clockOut', clockOut);

export = timeRouter;