"use strict";
/*
    Import npm packages
*/
var express = require("express");
var dotenv = require("dotenv");
/*=====================Configuration======================*/
dotenv.config({ path: '.env' });
var jobRouter = express.Router();
/*=====================Functions==========================*/
var createJob = function (req, res, next) {
    var jobTitle = req.body.job;
    var description = req.body.description;
    req.app.get('db').jobs.insert({
        name: jobTitle,
        description: description
    }).then(res.status(200).send({ success: true }))
        .catch(function (err) { return next(err); });
};
/*=====================Helper Function==========================*/
/*===========================Endpoints============================*/
jobRouter.post('/addJob', createJob);
module.exports = jobRouter;
//# sourceMappingURL=addJob.js.map