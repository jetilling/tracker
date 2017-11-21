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
import * as auth from './controllers/authentication/index';
import * as time from './controllers/time/index';
import * as jobs from './controllers/jobs/index';
import * as teams from './controllers/teams/index';
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
    app.use("/node_modules", express.static(path.resolve(__dirname, './node_modules')));
    app.use(express.static(__dirname + '/src'));
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
    app.use('/auth', auth);
    app.use('/time', time);
    app.use('/job', jobs);
    app.use('/alert', textService)
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