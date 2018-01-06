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
organizationRouter.get('/createOrganization', addOrganization.createOrganization);

export = organizationRouter