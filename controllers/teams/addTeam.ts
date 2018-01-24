"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as massive from 'massive';
import * as dotenv from 'dotenv';
import * as randToken from 'rand-token';

/*
    Import Utilities
*/
import { UserInfo } from '../../utilities/userInfo';

/*
    Import type interfaces
*/
import * as types from '../../typeDefinitions/types';
import * as utilTypes from '../../typeDefinitions/utilTypes';

/*=====================Class==========================*/

export class CreateTeam 
{

  userUtil: utilTypes.IUserInfo;

  constructor(){
    dotenv.config({ path: '.env' });
  }

  createTeam = async (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {
    let db = req.app.get('db');
    let teamName: string = req.body.name;
    let description: string = req.body.description;
    let organizationId: number = req.body.organizationId
    this.userUtil = new UserInfo(req.user)
    let userInfo = await this.userUtil.grabSafeUserInfo(req)
    
    if (userInfo.level === 1) {

      /*
        First the team is created
      */
      db.teams.insert({
        name: teamName,
        description: description,
        created_on: new Date(),
        creator: req.user
      }).then((result: types.ITeam) => {

        /*
          Then the creator to the team
        */
        db.users_to_teams.insert({
          team_id: result.id,
          user_id: req.user,
          level: 1
        }).then(() => {

          db.teams_to_organizations.insert({
            team_id: result.id,
            organization_id: organizationId
          })
        })

        res.status(200).send({success: true})

      }).catch((err: types.IError) => next(err))
    } else {
      res.send({success: false, message: 'User needs to be level 1 to create a team'})
    }
  }

  addMember = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {
    let db = req.app.get('db');
    let teamId: number = req.body.teamId;
    let firstName: string = req.body.firstName;
    let lastName: string = req.body.lastName;
    let email: string = req.body.email;
    let level: number = req.body.owner;


    if (teamId) {

      /*
        First we need to grab the team name so we can send it in the new member emails
      */
      db.teams.findOne({id: teamId}).then((team: types.ITeam) => {

        if (team) {

          let teamName = team.name;

          /*
            Then we need to grab the organization associated with the team.
            We'll use this to associate the user with the organization if they aren't already
          */
          db.teams_to_organizations.findOne({team_id: teamId}).then((teamToOrganization: types.ITeamToOrganization) => {

            if (teamToOrganization) {

              let organizationId = teamToOrganization.organization_id

              /*
                See if user exists
              */
              db.users.findOne({ email: email }).then( async (result: types.IRawUserObject) => {
                
                /*
                  If the user exists insert them in the users_to_team table and the users_to_organization table.
                  Send the user an email stating they have been added
                */
                if (result) {

                  let userAdded = await this.addUsersToTeamAndOrganization(req, req.user, teamId, organizationId, level)

                  res.send(userAdded)

                }

                /*
                  If the user does not exist
                */
                else {

                  let token: string = randToken.generate(16);

                  /*
                    Create a new user with minimal information
                  */
                  db.users.insert({
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    activated: 'FALSE',
                    email_validated: 'FALSE',
                    level: level ? 2 : 3,
                    registration_complete: 'FALSE'
                  }).then( async (user: types.IRawUserObject) => {
                    
                    /*
                      Add newly created user to the team
                      Send the user an email stating they have been added
                    */
                    let userAdded = await this.addUsersToTeamAndOrganization(req, req.user, teamId, organizationId, level)

                    res.send(userAdded)

                  }).catch((err: types.IError) => next(err))
                }
              })
            }
          })
        }
      })
    } 
    else {
      res.send({message: 'Please either choose or create a team first'})
    }
  }

/*=====================Helper Function==========================*/

  private addUsersToTeamAndOrganization = (req: express.Request, userId: number, teamId: number, organizationId: number, level: number) => {
    return new Promise((resolve, reject) => {
      let db = req.app.get('db');
      db.users_to_team.insert({
        team_id: teamId,
        user_id: userId,
        level: level
      }).then((response: types.IAddMemberRes) => {
        
        db.users_to_organization.insert({
          organization_id: organizationId,
          user_id: userId,
          level: 2
        }).then((userToOrganization: types.IUserToOrganization) => {
          
          // **TODO** We need to notify user via email they were added to group

          resolve({success: true})

        }).catch((err: types.IError) => reject(err))

      }).catch((err: types.IError) => reject(err))
    })
  }

}





