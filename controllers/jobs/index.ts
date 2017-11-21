"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';

/*  
    Import controllers
*/ 
import { AddJob } from './addjob';
import { JobInfo } from './jobInfo';

let jobRouter = express.Router();
let addJob = new AddJob()
let jobInfo = new JobInfo()

/*
    Endpoints
*/
jobRouter.get('/jobInfo', jobInfo.getJobInfo);
jobRouter.put('/editJob', jobInfo.editJob);
jobRouter.post('/addJob', addJob.createJob);



export = jobRouter;



