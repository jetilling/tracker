"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as massive from 'massive';
import * as dotenv from 'dotenv';
import * as randToken from 'rand-token';

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

export class TeamInfo 
{

  userUtil: utilTypes.IUserInfo;

  constructor(){
    dotenv.config({ path: '.env' });
  }

  teamSearch = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let teamName = req.body.teamName

    req.app.get('db').teams.search({
      fields: ['name'], 
      term: teamName
    }, {stream: true}
    ).then((teamStream: types.ITeam) => {
      res.send({success: true, data: teamStream})
    });
    
  }

  teamInfo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  }

  teamsInOrganization = (req: express.Request, res: express.Response, next: express.NextFunction) => {
      let organizationId = req.params.organizationId
      let listOfTeams: types.ITeam[] = []


      req.app.get('db').teams_to_organizations.find({organization_id: organizationId})
      .then((teamsToOrganization: types.ITeamToOrganization[]) => {
        
        if (teamsToOrganization.length > 0) {
          teamsToOrganization.forEach(async (team, index) => {
            listOfTeams.push(await this.getTeamInfoById(req, team.team_id))
            
            if (index === teamsToOrganization.length - 1) {
              res.send({success: true, teams: true, data: listOfTeams})
            }
          });
        } else res.send({success: true, teams: false})
      })
  }

  getTeamMembers = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    this.userUtil = new UserInfo()
    let teamId = req.params.teamId;
    let members: types.ISafeUserObject[] = []

    req.app.get('db').users_to_teams.find({team_id: teamId})
    .then((usersToTeams: types.ITeamToUsers[]) => {
      usersToTeams.forEach(async (element, index) => {
        members.push(await this.userUtil.grabSafeUserInfo(req, element.user_id))

        if (index === usersToTeams.length - 1) {
          res.send({success: true, data: members})
        }
      })
    })
  }
  

/*=====================Helper Function==========================*/
  private getTeamInfoById = (req: express.Request, teamId: number): Promise<types.ITeam> => {
    return new Promise((resolve, reject) => {
        let db = req.app.get('db')

        db.teams.findOne({id: teamId})
        .then((team: types.ITeam) => {
          resolve(team)
        })
    })
  }

}





