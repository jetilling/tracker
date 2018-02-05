"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';

/*  
    Import controllers
*/ 
import { AddProject } from './addProject';
import { ProjectInfo } from './projectInfo';

let projectRouter = express.Router();
let addProject = new AddProject()
let projectInfo = new ProjectInfo()

/*
    Endpoints
*/
projectRouter.get('/projectInfo/:id', projectInfo.getProjectInfo);
projectRouter.put('/editProject', projectInfo.editProject);
projectRouter.post('/createProject', addProject.createProject);
projectRouter.post('/addTeamToProject', addProject.addTeamToProject);


export = projectRouter;



