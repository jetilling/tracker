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
import { UserInfo } from '../../utilities/userInfo';

/*
    Import type interfaces
*/
import * as types from '../../typeDefinitions/types';
import * as utilTypes from '../../typeDefinitions/utilTypes'

/*=====================Class==========================*/

export class AddOrganization
{   
    userUtil: utilTypes.IUserInfo;

    constructor(){
        dotenv.config({ path: '.env' });
    }

    createOrganization = async (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {

        let organizationName = req.body.name;
        let description = req.body.description;
        let created = req.body.created;
        this.userUtil = new UserInfo()
        let userInfo = await this.userUtil.grabSafeUserInfo(req, req.user)
        let newOrganization = {
            name: organizationName,
            description: description,
            created_on: new Date(created),
            creator: req.user
        }

        if (userInfo && userInfo.level == 1) {
            
            req.app.get('db').organizations.insert(newOrganization)
            .then(async (organization: types.IOrganization) => {

                /*
                    Here we want to add the creater to the organization
                */
                await this.addMemberToOrganization(req, userInfo, organization, true)

                res.status(200).send({success: true, data: organization})

            }).catch((err: types.IError) => next(err))
        }

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

    addProjectToOrganization = (req: express.Request, projectInfo: types.IProjects, organizationInfo: types.IOrganization) => {
        let projectId = projectInfo.id
        let organizationId = organizationInfo.id

        req.app.get('db').projects_to_organizations.insert({
          project_id: projectId,
          organization_id: organizationId
        }).then((organization: types.IOrganization) => {
          return {sucess: true}
        }).catch((err: types.IError) => {throw err})
    }


}

/*=====================Helper Function==========================*/

