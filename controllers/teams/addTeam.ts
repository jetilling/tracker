"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as massive from 'massive';
import * as dotenv from 'dotenv';
import * as randToken from 'rand-token';

/*
    Import type interfaces
*/
import * as types from '../../typeDefinitions/types';

/*=====================Class==========================*/

export class CreateTeam 
{

  constructor(){
    dotenv.config({ path: '.env' });
  }

  createTeam = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {
    let teamName: string = req.body.teamName;
    let description: string = req.body.description;

    /*
      First the team is created
    */
    req.app.get('db').teams.insert({
      name: teamName,
      description: description
    }).then((result: types.ITeamRes) => {

      /*
        Then the creator to the team
      */
      req.app.get('db').users_to_teams.insert({
        team_id: result.id,
        user_id: req.user.id,
        owner: 'TRUE'
      })

      res.status(200).send({success: true})

    }).catch((err: types.IError) => next(err))
  }

  addMember = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {
    let db = req.app.get('db');
    let teamId: number = req.body.teamId;
    let firstName: string = req.body.firstName;
    let lastName: string = req.body.lastName;
    let email: string = req.body.email;
    let owner: boolean = req.body.owner;


    if (teamId) {

      /*
        First we need to grab the team name so we can send it in the new member emails
      */
      db.teams.findOne({ id: teamId}).then((team: types.ITeamRes) => {

        let teamName = team.name;
        let creatorName = req.user.firstname

        /*
          See if user exists
        */
        db.users.findOne({ email: email }).then((result: types.IRawUserObject) => {
          
          /*
            If the user exists insert them in the users_to_team table.
            Send the user an email stating they have been added
          */
          if (result) {
            db.users_to_team.insert({
              team_id: teamId,
              user_id: result.id,
              owner: owner
            }).then((response: types.IAddMemberRes) => {

                // **TODO** We need to notify user via email they were added to group

                res.status(200).send({success: true})

            }).catch((err: types.IError) => next(err))
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
              level: owner ? 1 : 2,
              registration_complete: 'FALSE'
            }).then((user: types.IRawUserObject) => {
              
              /*
                Add newly created user to the team
                Send the user an email stating they have been added
              */
              db.users_to_team.insert({
                team_id: teamId,
                user_id: user.id,
                owner: owner
              }).then(() => {

                // **TODO** We need to notify user via email they were added to group
                // This email should tell them they were added to the group, but it should also say they need to
                // create/activate their account

                res.status(200).send({success: true})

              }).catch((err: types.IError) => next(err))
            }).catch((err: types.IError) => next(err))
          }
        })
      })
    } 
    else {
      res.send({message: 'Please either choose or create a team first'})
    }
  }

/*=====================Helper Function==========================*/

}




