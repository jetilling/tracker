/*
  The purpose of this file is to quickly retrieve information
  for a given team id
*/

import * as express from 'express';

import * as types from '../typeDefinitions/types';
import * as utilTypes from '../typeDefinitions/utilTypes';
import { reject } from 'q';

export class TeamInfoUtil implements utilTypes.ITeamInfo {

  constructor() {
  }

  getTeamInfoById = (req: express.Request, teamId: number): Promise<types.ITeam> => {
    return new Promise((resolve, reject) => {
      
      let db = req.app.get('db')

      db.teams.findOne({id: teamId})
      .then((team: types.ITeam) => {

        if (team) {
          resolve(team)
        } else {
          reject({success: false, message: `No teams with id ${teamId} found`})
        }
      })
      
    })
  }

  getTeamMemberIds = (req: express.Request, teamId: number): Promise<number[]> => {
    return new Promise((resolve, reject) => {
      let db = req.app.get('db')

      db.users_to_teams.find({team_id: teamId})
      .then((usersToTeams: types.ITeamToUsers[]) => {
        let result = usersToTeams.map((userTeam: types.ITeamToUsers) => userTeam.user_id);
        resolve(result)

      }).catch((err: types.IError) => {
        reject({success: false, message: 'there was an error'})
      })
    })
  }
}
