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


/*
    Import type interfaces
*/
import * as types from '../../typeDefinitions/types';

/*=====================Class==========================*/

export class UserInfo {   

  constructor(){
    dotenv.config({ path: '.env' });
  }

  /**
   * @description Grabs the info for the logged in user
   */
  getLoggedInUserInfo = async (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {

    let userId = req.user
    let userResult = await this.pullUserInfo(req, userId)
    res.send(userResult)
    
  }

  /**
   * @description Grabs the info for a user if the requesting user is level 1 and the user their requesting is in one of their teams
   */
  getUserInfo = async (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {
    let db = req.app.get('db')
    let userIdToSearchFor = req.params.userId
    let userInfo = await this.pullUserInfo(req, req.user)
    let user = userInfo.data

    if (user.level === 1 || user.level === 2) {
      db.users_to_teams.findOne({user_id: user.id})
      .then((teamToUsers: types.ITeamToUsers) => {
        db.users_to_teams.find({team_id: teamToUsers.team_id})
        .then((allUsers: [types.ITeamToUsers]) => {

          allUsers.forEach(userElement => {
            if (userElement.user_id == userIdToSearchFor) {
              this.pullUserInfo(req, userIdToSearchFor).then((userInfoToSend: types.IRetrievedUser) => {
                res.send(userInfoToSend)
              })
              
            }
          });
          
        }).catch((err: types.IError) => {throw err})
      }).catch((err: types.IError) => {throw err})
    } else if (user.level === 3) {
      if (userIdToSearchFor == req.user) res.send({success: true, data: user})
      else res.send({success: false, message: 'Unauthorized'})
    }
    
  }

  /**
   * @description Searches the users table for users matching request
   */
  searchUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let searchTerm = req.params.term;

    req.app.get('db').users.search({
      fields: ['firstname', 'lastname', 'phone_number', 'email'], 
      term: searchTerm
    }, {stream: true}
    ).then((userStream: types.ISafeUserObject) => {
      res.send({success: true, data: userStream})
    }).catch((err: types.IError) => next(err));

  }

  /**
   * @description Edits the user based on the property that needs to be updated
   */
  editUserInfo = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {
    interface IUpdatedUser {
      id: number,
      firstname?: string,
      lastname?: string,
      email?: string,
      phone_number?: string
    }
    
    let userId = req.body.userId;
    let propertyUpdated = req.body.propertyUpdated;
    let valueUpdated = req.body.valueUpdated;
    let updatedUser: IUpdatedUser = {
      id: userId
    }

    if (req.user === userId) {
      switch (propertyUpdated) {
        case 'firstname':
          updatedUser.firstname = valueUpdated;
          break;

        case 'lastname':
          updatedUser.lastname = valueUpdated;
          break;

        case 'email':
          updatedUser.email = valueUpdated;
          break;

        case 'phone_number':
          updatedUser.phone_number = valueUpdated;
          break;

        default:
          res.send(`Error: ${propertyUpdated} doesn't match any user properties.`)
      }
    }

    req.app.get('db').users.update(updatedUser)
    .then((userRes: types.ISafeUserObject) => {
      res.send({success: true, data: userRes})
    }).catch((err: types.IError) => next(err))
  }

  /*=====================Helper Function==========================*/


  /**
   * @description Pulls the user info and send the safe info
   */
  pullUserInfo = (req: types.expressRequest, userId: number): Promise<types.IRetrievedUser> => {
    return new Promise<types.IRetrievedUser>((resolve, reject) => {
      
      req.app.get('db').users.findOne({id: userId})
      .then((user: types.IRawUserObject) => {
        let userToSend: types.ISafeUserObject = {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          email_validated: user.email_validated,
          activated: user.activated,
          level: user.level
        }
        resolve({success: true, data: userToSend})
      }).catch((err: types.IError) => {throw err})
  
    })
  }
}
