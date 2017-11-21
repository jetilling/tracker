"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';

/*  
    Import controllers
*/ 
import { EditTIme } from './editTime';

let timeRouter = express.Router();
let editTime = new EditTIme()

/*
    Endpoints
*/
timeRouter.post('/clockin', editTime.clockIn);
timeRouter.put('/clockOut', editTime.clockOut);
timeRouter.post('/startNewWeek', editTime.startNewWeek);

export = timeRouter;