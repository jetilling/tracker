"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as massive from 'massive';
import * as dotenv from 'dotenv';
import * as randToken from 'rand-token';

/*
    Import type interfaces
*/
import * as types from '../../typeDefinitions/types';

/*=====================Class==========================*/

export class TeamInfo 
{

  constructor(){
    dotenv.config({ path: '.env' });
  }

  teamSearch = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let teamName = req.body.teamName

    req.app.get('db').teams.search({
      fields: ['name'], 
      term: teamName
    }, {stream: true}
    ).then((teamStream: types.ITeamRes) => {
      res.send({success: true, data: teamStream})
    });
    
  }

  teamInfo = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  }
  

/*=====================Helper Function==========================*/

}





