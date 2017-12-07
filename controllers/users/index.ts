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
userRouter.get('/userInfo/:userId', userInfo.getUserInfo);
userRouter.get('/loggedInUser', userInfo.getLoggedInUserInfo);
userRouter.put('/editUser', userInfo.editUserInfo);


export = userRouter;