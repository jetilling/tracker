
"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as massive from 'massive';
import * as dotenv from 'dotenv';
import * as twilio from 'twilio'

/*
    Import type interfaces
*/
import * as types from '../typeDefinitions/types';

/*=====================Configuration======================*/

dotenv.config({ path: '.env' });
let textServiceRouter = express.Router();

/*=====================Functions==========================*/

let sendTestText = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  var client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  client.messages.create({
      body: "Just wondering if you've started working on Hal's project?",
      to: 'recipient number here',  // Text this number
      from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
  })
  .then((message: any) => res.send(message.sid));
}

/*=====================Helper Function==========================*/


/*===========================Endpoints============================*/

textServiceRouter.get('/textService', sendTestText);

export = textServiceRouter;