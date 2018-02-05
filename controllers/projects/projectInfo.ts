"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as massive from 'massive';
import * as dotenv from 'dotenv';
import * as moment from 'moment';

/*
    Import any application utilities
*/
import { Time } from '../../utilities/time';

/*
    Import type interfaces
*/
import * as types from '../../typeDefinitions/types';
import * as utilTypes from '../../typeDefinitions/utilTypes'

/*=====================Class==========================*/

export class ProjectInfo {   

  time: utilTypes.ITime

  constructor(){
      dotenv.config({ path: '.env' });
      this.time = new Time()
  }

  getProjectInfo = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    let projectId = req.params.id;
    let db = req.app.get('db')

    db.projects.findOne({id: projectId})
    .then((projectRes: types.IProjects) => {

      // db.time.find({project_id: projectId})
      // .then((timeRes: types.ITimeRaw) => {

      //   db.
      // })

      // **TODO** Get all tables / data that are related to projects
      
      res.send({success: true, data: projectRes})
    }).catch((err: types.IError) => next(err))
  }

  editProject = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    interface IUpdatedProject {
      id: number,
      name?: string,
      description?: string,
      start_date?: Date,
      end_date?: Date,
      estimated_duration?: number,
      estimated_cost?: number,
      total_seconds_worked?: number
    }
    
    let projectId = req.body.project;
    let propertyUpdated = req.body.propertyUpdated;
    let valueUpdated = req.body.valueUpdated;
    let updatedProject: IUpdatedProject = {
      id: projectId
    }

    switch (propertyUpdated) {
      case 'name':
        updatedProject.name = valueUpdated;
        break;

      case 'description':
        updatedProject.description = valueUpdated;
        break;

      case 'start_date':
        updatedProject.start_date = valueUpdated;
        break;

      case 'end_date':
        updatedProject.end_date = valueUpdated;
        break;

      case 'estimated_duration':
        updatedProject.estimated_duration = valueUpdated;
        break;

      case 'estimated_cost':
        updatedProject.estimated_cost = valueUpdated;
        break;

      case 'total_seconds_worked':
        updatedProject.total_seconds_worked = valueUpdated;
        break;

      default:
        res.send(`Error: ${propertyUpdated} doesn't match any project properties.`)
    }

    req.app.get('db').projects.update(updatedProject)
    .then((projectRes: types.IProjects) => {
      res.send({success: true, data: projectRes})
    }).catch((err: types.IError) => next(err))
            
  }

}

/*=====================Helper Function==========================*/
