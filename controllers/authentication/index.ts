"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';

/*  
    Import controllers
*/ 
import { Authenticate } from './authentication';

let authRouter = express.Router();
let auth = new Authenticate()

/*
    Endpoints
*/
authRouter.get('/findOrganizations', auth.findTeamsAndOrganizationsByUserEmail)
authRouter.post('/login', auth.login);
authRouter.post('/register', auth.registerNewUser);

export = authRouter;