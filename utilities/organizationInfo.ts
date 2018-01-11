/*
  The purpose of this file is to quickly retrieve information
  for a given team id
*/

import * as express from 'express';

import * as types from '../typeDefinitions/types';
import * as utilTypes from '../typeDefinitions/utilTypes';
import { reject } from 'q';

export class OrganizationInfo implements utilTypes.IOrganizationInfo {

  organizationId: number;

  constructor(id: number) {
    this.organizationId = id
  }

  grabOrganizationInfo = (req: express.Request): Promise<types.IOrganization> => {
    return new Promise((resolve, reject) => {
      
      let db = req.app.get('db')

      db.organization.findOne({id: this.organizationId})
      .then((organization: types.IOrganization) => {

        if (organization) {
          resolve(organization)
        } else {
          reject({success: false, message: `No organizations with id ${this.organizationId} found`})
        }
      })
      
    })
  }
}
