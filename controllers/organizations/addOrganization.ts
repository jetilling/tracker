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

export class AddOrganization
{   
    time: utilTypes.ITime

    constructor(){
        dotenv.config({ path: '.env' });
        this.time = new Time()
    }

    createoOrganization = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {

        let jobTitle = req.body.name;
        let description = req.body.description;
        let startDate = req.body.startDate;

        req.app.get('db').jobs.insert({
            name: jobTitle,
            description: description,
            start_date: new Date(startDate),
            creator: req.user
        }).then(res.status(200).send({success: true}))
        .catch((err: types.IError) => next(err))
    }

    addMemberToOrganization = (req: express.Request, userInfo: types.ISafeUserObject, organizationInfo: types.IOrganization, owner: boolean) => {
        let userId = userInfo.id
        let organizationId = organizationInfo.id

        if (userInfo.level === 1 && owner) {
            req.app.get('db').users_to_organizations.insert({
            user_id: userId,
            organization_id: organizationId,
            owner: owner
            }).then((organization: types.IOrganization) => {
            return {sucess: true}
            }).catch((err: types.IError) => {throw err})
        }
    }

    addTeamToOrganization = (req: express.Request, teamInfo: types.ITeam, organizationInfo: types.IOrganization) => {
        let teamId = teamInfo.id
        let organizationId = organizationInfo.id

        req.app.get('db').teams_to_organizations.insert({
          team_id: teamId,
          organization_id: organizationId
        }).then((organization: types.IOrganization) => {
          return {sucess: true}
        }).catch((err: types.IError) => {throw err})
    }

    addJobToOrganization = (req: express.Request, jobInfo: types.IJobs, organizationInfo: types.IOrganization) => {
        let jobId = jobInfo.id
        let organizationId = organizationInfo.id

        req.app.get('db').jobs_to_organizations.insert({
          job_id: jobId,
          organization_id: organizationId
        }).then((organization: types.IOrganization) => {
          return {sucess: true}
        }).catch((err: types.IError) => {throw err})
    }


}

/*=====================Helper Function==========================*/

