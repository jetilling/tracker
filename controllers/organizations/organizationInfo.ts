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
import { TeamInfoUtil } from '../../utilities/teamInfo';

/*
    Import type interfaces
*/
import * as types from '../../typeDefinitions/types';
import * as utilTypes from '../../typeDefinitions/utilTypes'
import { expressRequest } from '../../typeDefinitions/types';

/*=====================Class==========================*/

export class OrganizationInfo
{   
    userUtil: utilTypes.IUserInfo;
    teamUtil: utilTypes.ITeamInfo

    constructor(){
        dotenv.config({ path: '.env' });
    }

    getOrganizationInfo = async (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {
        let useUserId = req.params.useUserId
        let id = parseInt(req.params.id)
        let data;

        if (useUserId) data = await this.getByUser(req, id)
        else data = await this.getOrganizationById(req, id)

        res.send({success: true, data: data})

    }

    getMembers = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {
        this.userUtil = new UserInfo()
        let organizationId = req.params.organizationId
        let members: types.ISafeUserObject[] = []

        req.app.get('db').users_to_organizations.find({organization_id: organizationId})
        .then((usersToOrganizations: types.IUserToOrganization[]) => {
            usersToOrganizations.forEach(async (element, index) => {
                members.push(await this.userUtil.grabSafeUserInfo(req, element.user_id))

                if (index === usersToOrganizations.length - 1) {
                    res.send({success: true, data: members})
                }
            })
        })

    }

    getFilteredMembers = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {
        this.userUtil = new UserInfo()
        let organizationId = req.params.organizationId
        let teamId = req.params.teamId
        let orgMembers: types.ISafeUserObject[] = []
        let finalList;

        req.app.get('db').users_to_organizations.find({organization_id: organizationId})
        .then((usersToOrganizations: types.IUserToOrganization[]) => {
            usersToOrganizations.forEach(async (element, index) => {
                if (element.user_id !== req.user) {
                    orgMembers.push(await this.userUtil.grabSafeUserInfo(req, element.user_id))
                }
                if (index === usersToOrganizations.length - 1) {
                    finalList = await this.removeTeamMembersFromList(req, teamId, orgMembers)
                    res.send({success: true, data: finalList})
                }
            })
        })

    }

  /*=====================Helper Function==========================*/
    
    getByUser = (req: types.expressRequest, id: number) => {
        return new Promise((resolve, reject) => {
            let db = req.app.get('db')
        
            db.users_to_organizations.find({user_id: id})
            .then((organizations: types.IUserToOrganization[]) => {
                if (organizations) {
                    let retrievedOrganizations: types.IOrganization[] = []
                    organizations.forEach(async (item, index) => {
                        let organization = await this.getOrganizationById(req, item.organization_id)
                        retrievedOrganizations.push(organization)
                        if(index == organizations.length -1) resolve(retrievedOrganizations)
                    })
                }
            })
        })
    }

    getOrganizationById = (req: types.expressRequest, organizationId: number): Promise<types.IOrganization> => {
        return new Promise((resolve, reject) => {
            let db = req.app.get('db')

            db.organizations.findOne({id: organizationId})
            .then((organization: types.IOrganization) => {
                resolve(organization)
            })
        })
    }

    removeTeamMembersFromList = (req: express.Request, teamId: number, orgMembers: types.ISafeUserObject[]): Promise<types.ISafeUserObject[]> => {
        return new Promise((resolve, reject) => {
            this.teamUtil = new TeamInfoUtil()
            this.teamUtil.getTeamMemberIds(req, teamId).then(teamMemberIds => {
            
                let finalList = orgMembers.filter((member: types.ISafeUserObject) => {
                    if (teamMemberIds.indexOf(member.id) > -1) return member
                })

                resolve(finalList)
            })
        })
    }
}

