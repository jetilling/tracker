"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as massive from 'massive';
import * as moment from 'moment';
import * as dotenv from 'dotenv';

/*
    Import any application utilities
*/
import { Time } from '../../utilities/time';

/*
    Import type interfaces
*/
import * as types from '../../typeDefinitions/types';
import * as utilTypes from '../../typeDefinitions/utilTypes'

/*=====================Configuration======================*/

/*=====================Class==========================*/
export class EditTIme
{

  time: utilTypes.ITime

  constructor(){
    dotenv.config({ path: '.env' });
    this.time = new Time();
  }

  clockIn = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {

    let projectId = req.body.projectId;
    let userId = req.user;
    let current_time = req.body.time;

    req.app.get('db').time.insert({
      user_id: userId,
      project_id: projectId,
      clock_in: moment(current_time)
    }).then((timeRes: types.ITimeRaw) => {
      res.send({success: true, timeId: timeRes.id})
    })
    .catch((err: types.IError) => next(err))
  }

  clockOut = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    let db = req.app.get('db');
    let timeId = req.body.timeId 
    let timeOut = req.body.time
    let start: any
    let end: any
    let difference: number
    let timeAdded: Promise<boolean[]>
    
    db.time.find({id: timeId})
      .then((timeRes: types.ITimeRaw) => {

        //For whatever reason my response was being wrapped in [ Anonymous {}]...
        difference = this.time.findDifference(timeRes[0]['clock_in'], timeOut, "s")
        let weekId = timeRes.week_time
        let projectId = timeRes.project_id

        db.time.update({
          id: timeId,
          clock_out: new Date(timeOut),
          total_time: difference
        }).then(async (time: types.ITimeRaw) => {

          /*
            Here we are adding the time to the week and to the project.
            Both of these functions are async so we resolve them with a Promise
            and store the result in the timeAdded array. 

            The function definitions can be found in the helper functions section below
          */
          timeAdded = Promise.all([
              await this.addToWeekTime(req, difference, weekId),
              await this.addToProjectTotal(req, difference, projectId)
          ]) 
          
          if (timeAdded[0] && timeAdded[1]) res.send({success: true, totalTime: difference})
        }).catch((err: types.IError) => next(err))
    

      }).catch((err: types.IError) => next(err))

  }

  startNewWeek = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    let db = req.app.get('db')
    let startOfWeek = moment().startOf('isoWeek').format('MM/DD/YYYY')
    
    db.projects.find().then((projects: types.IProjects) => {
        db.week_time.find({
          week_of: startOfWeek
        }).then((weekInfo: [types.IWeek]) => {
          
          if (weekInfo.length > 0) 
          {
            res.status(200).send({
              success: true, 
              projects: projects, 
              total_time: weekInfo[0].total_time_for_week
            })
          }

          else 
          {
            db.week_time.insert({
              total_time_for_week: 0,
              week_of: startOfWeek
            }).then((weekInfo: types.IWeek) => {
              res.status(200).send({success: true, projects: projects, total_time: weekInfo.total_time_for_week})
            }).catch((err: types.IError) => next(err))
          }
        }).catch((err: types.IError) => next(err))
    }).catch((err: types.IError) => next(err))
    
  }


  /*=====================Helper Function==========================*/

  private addToWeekTime = (req: express.Request, difference: number, weekId: number) => {
    return new Promise<boolean>((resolve, reject) => {
      let db = req.app.get('db')

      db.week_time.find({id: weekId}).then((weekRes: types.IWeek) => {

        let totalWeekTime: number = weekRes.total_time_for_week + difference

        db.week_time.update({
          id: weekId,
          total_time_for_week: totalWeekTime
        }).then(resolve(true))
          .catch((err: types.IError) => reject(err))
      })
    })

  }

  private addToProjectTotal = (req: express.Request, difference: number, projectId: number) => {
    return new Promise<boolean>((resolve, reject) => {
      let db = req.app.get('db')
      
          db.projects.find({id: projectId}).then((projectRes: types.IProjects) => {
      
            let totalProjectTime: number = projectRes.total_seconds_worked + difference
      
            db.projects.update({
              id: projectId,
              total_seconds_worked: totalProjectTime
            }).then(resolve(true))
              .catch((err: types.IError) => reject(err))
          })
    })
  }
}
