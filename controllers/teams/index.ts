"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';

/*  
    Import controllers
*/ 
import { CreateTeam } from './addTeam';
import { TeamInfo } from './teamInfo';

let teamRouter = express.Router();
let createTeam = new CreateTeam();
let teamInfo = new TeamInfo();

/*
    Endpoints
*/
teamRouter.get('/searchTeams', teamInfo.teamSearch);
teamRouter.post('/createTeam', createTeam.createTeam);
teamRouter.post('/addMember', createTeam.addMember);

export = teamRouter

