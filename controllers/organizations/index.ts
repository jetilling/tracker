"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';

/*  
    Import controllers
*/ 
import { AddOrganization } from './addOrganization';
import { OrganizationInfo } from './organizationInfo'


let organizationRouter = express.Router();
let addOrganization = new AddOrganization();
let organizationInfo = new OrganizationInfo();

/*
    Endpoints
*/
organizationRouter.get('/getOrganizationInfo/:useUserId&:id', organizationInfo.getOrganizationInfo)
organizationRouter.post('/createOrganization', addOrganization.createOrganization);

export = organizationRouter