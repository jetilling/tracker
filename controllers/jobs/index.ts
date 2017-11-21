"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';

/*  
    Import controllers
*/ 
import { AddJob } from './addjob';

let jobRouter = express.Router();
let addJob = new AddJob()

/*
    Endpoints
*/
jobRouter.post('/addJob', addJob.createJob);

export = jobRouter;



