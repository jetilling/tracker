"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';

/*  
    Import controllers
*/ 
import { AddOrganization } from './addOrganization';


let organizationRouter = express.Router();
let addOrganization = new AddOrganization();

/*
    Endpoints
*/
organizationRouter.post('/createOrganization', addOrganization.createOrganization);

export = organizationRouter