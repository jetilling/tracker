"use strict"

/*  
    Import npm packages
*/ 
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as moment from 'moment';
import * as massive from 'massive';
import * as express from 'express';  

/*  
    Import controllers
*/ 
import * as timeTracker from './controllers/timeTracker';
import * as addJob from './controllers/addJob';
import * as textService from './controllers/textService';

/*  
    Import type interfaces
*/ 
import * as types from './typeDefinitions/types.d';

/*
    Export WebApi Class
*/
export class WebApi 
{

  constructor(
    private app: express.Express,
    private port: number
  )
  {
    dotenv.config({ path: '.env' });
    this.configureMiddleware(app);
    this.configureRoutes(app);
  }

  /**
   * 
   * @param app 
   */
  private configureMiddleware(app: express.Express)
  {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    massive(process.env.DB_CONNECT).then(db => {
      app.set('db', db);
    })
  }

  /**
   * Configure Routes
   * 
   * @description
   * @param app 
   */
  private configureRoutes(app: express.Express)
  {
    app.use('/time', timeTracker);
    app.use('/job', addJob);
    app.use('/alert', textService)

    app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {

      let startOfWeek = moment().startOf('isoWeek').format('MM/DD/YYYY')

      req.app.get('db').jobs.find().then((jobs: types.IJobsRaw) => {
          req.app.get('db').week_time.find({
            week_of: startOfWeek
          }).then((weekInfo: [types.IWeekInfoRaw]) => {
            
            if (weekInfo.length > 0) 
            {
              res.status(200).send({
                success: true, 
                jobs: jobs, 
                total_time: weekInfo[0].total_time_for_week
              })
            }

            else 
            {
              req.app.get('db').week_time.insert({
                total_time_for_week: 0,
                week_of: startOfWeek
              }).then((weekInfo: types.IWeekInfoRaw) => {
                res.status(200).send({success: true, jobs: jobs, total_time: weekInfo.total_time_for_week})
              }).catch((err: types.IError) => next(err))
            }
          }).catch((err: types.IError) => next(err))
      }).catch((err: types.IError) => next(err))

    })

  }

  /**
   * 
   * @description
   */
  public run() 
  {
    this.app.listen(this.port, () => {
      console.log('Listening on ', this.port)
    }) 
  }
  
}