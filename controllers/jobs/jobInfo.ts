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
import { Time } from '../../utilities/time';

/*
    Import type interfaces
*/
import * as types from '../../typeDefinitions/types';
import * as utilTypes from '../../typeDefinitions/utilTypes'

/*=====================Class==========================*/

export class JobInfo {   

  time: utilTypes.ITime

  constructor(){
      dotenv.config({ path: '.env' });
      this.time = new Time()
  }

  getJobInfo = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    let jobId = req.body.id;

    req.app.get('db').jobs.findOne({id: jobId})
    .then((jobRes: types.IJobs) => {

      // **TODO** Get all tables / data that are related to jobs
      
      res.send({success: true, data: jobRes})
    }).catch((err: types.IError) => next(err))
  }

  editJob = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    interface IUpdatedJob {
      id: number,
      name?: string,
      description?: string,
      start_date?: Date,
      end_date?: Date,
      estimated_duration?: number,
      estimated_cost?: number,
      total_seconds_worked?: number
    }
    
    let jobId = req.body.job;
    let propertyUpdated = req.body.propertyUpdated;
    let valueUpdated = req.body.valueUpdated;
    let updatedJob: IUpdatedJob = {
      id: jobId
    }

    switch (propertyUpdated) {
      case 'name':
        updatedJob.name = valueUpdated;
        break;

      case 'description':
        updatedJob.description = valueUpdated;
        break;

      case 'start_date':
        updatedJob.start_date = valueUpdated;
        break;

      case 'end_date':
        updatedJob.end_date = valueUpdated;
        break;

      case 'estimated_duration':
        updatedJob.estimated_duration = valueUpdated;
        break;

      case 'estimated_cost':
        updatedJob.estimated_cost = valueUpdated;
        break;

      case 'total_seconds_worked':
        updatedJob.total_seconds_worked = valueUpdated;
        break;

      default:
        res.send(`Error: ${propertyUpdated} doesn't match any job properties.`)
    }

    req.app.get('db').jobs.update(updatedJob)
    .then((jobRes: types.IJobs) => {
      res.send({success: true, data: jobRes})
    }).catch((err: types.IError) => next(err))
            
  }

}

/*=====================Helper Function==========================*/
