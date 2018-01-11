/*
  The purpose of this file is to quickly retrieve information
  for a given team id
*/

import * as express from 'express';

import * as types from '../typeDefinitions/types';
import * as utilTypes from '../typeDefinitions/utilTypes';
import { reject } from 'q';

export class TeamInfo implements utilTypes.ITeamInfo {

  teamId: number;

  constructor(id: number) {
    this.teamId = id
  }

  grabTeamInfo = (req: express.Request): Promise<types.ITeam> => {
    return new Promise((resolve, reject) => {
      
      let db = req.app.get('db')

      db.teams.findOne({id: this.teamId})
      .then((team: types.ITeam) => {

        if (team) {
          resolve(team)
        } else {
          reject({success: false, message: `No teams with id ${this.teamId} found`})
        }
      })
      
    })
  }
}
