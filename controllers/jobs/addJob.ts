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

export class AddJob
{   
    time: utilTypes.ITime

    constructor(){
        dotenv.config({ path: '.env' });
        this.time = new Time()
    }

    createJob = (req: express.Request, res: express.Response, next: express.NextFunction) => {

        let jobTitle = req.body.name;
        let description = req.body.description;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let estimatedCost = req.body.cost;
        let duration = this.time.findDifference(startDate, endDate, 's')

        req.app.get('db').jobs.insert({
            name: jobTitle,
            description: description,
            start_date: new Date(startDate),
            end_date: new Date(endDate),
            estimated_duration: duration,
            estimated_cost: estimatedCost,
            total_seconds_worked: 0
        }).then(res.status(200).send({success: true}))
        .catch((err: types.IError) => next(err))
    }

    addMembersToJob = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        
    }

    addTeamToJob = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let teamId = req.body.teamId
        let jobId = req.body.jobId

        req.app.get('db').teams_to_jobs.insert({
            team_id: teamId,
            job_id: jobId
        }).then(res.send({sucess: true}))
        .catch((err: types.IError) => next(err))
    }


}

/*=====================Helper Function==========================*/

