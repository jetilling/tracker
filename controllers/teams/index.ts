"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';

/*  
    Import controllers
*/ 
import { CreateTeam } from './addTeam';

let teamRouter = express.Router();
let createTeam = new CreateTeam()

/*
    Endpoints
*/
teamRouter.post('/createTeam', createTeam.createTeam);
teamRouter.post('/addMember', createTeam.addMember);

export = teamRouter

