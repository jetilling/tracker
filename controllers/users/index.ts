"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';

/*  
    Import controllers
*/ 
import { UserInfo } from './userInfo';

let userRouter = express.Router();
let userInfo = new UserInfo()

/*
    Endpoints
*/
userRouter.get('/searchUser/:term', userInfo.searchUser);


export = userRouter;