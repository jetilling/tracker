"use strict";
/*
    Import npm packages
*/
var express = require("express");
var moment = require("moment");
var dotenv = require("dotenv");
/*=====================Configuration======================*/
dotenv.config({ path: '.env' });
var timeRouter = express.Router();
/*=====================Functions==========================*/
var clockIn = function (req, res, next) {
    var job = req.body.jobId;
    var time = req.body.time;
    req.app.get('db').time.insert({
        job_id: job,
        clock_in: moment(time)
    }).then(function (time) {
        res.send({ success: true, timeId: time.id });
    })
        .catch(function (err) { return next(err); });
};
var clockOut = function (req, res, next) {
    var timeId = req.body.timeId;
    var timeOut = req.body.time;
    var start;
    var end;
    var difference;
    req.app.get('db').time.find({ id: timeId })
        .then(function (time) {
        //For what ever reason my response was being wrapped in [ Anonymous {}]...
        start = moment(time[0]['clock_in']);
        end = moment(timeOut);
        difference = moment(end.diff(start)).format("s");
        req.app.get('db').time.update({
            id: timeId,
            clock_out: new Date(timeOut),
            total_time: difference
        }).then(function (time) {
            res.send({ success: true, totalTime: difference });
        }).catch(function (err) { return next(err); });
    }).catch(function (err) { return next(err); });
};
var startNewWeek = function (req, res, next) {
    var startOfWeek = moment().startOf('isoWeek').format('MM/DD/YYYY');
    req.app.get('db').jobs.find().then(function (jobs) {
        req.app.get('db').week_time.find({
            week_of: startOfWeek
        }).then(function (weekInfo) {
            if (weekInfo.length > 0) {
                res.status(200).send({
                    success: true,
                    jobs: jobs,
                    total_time: weekInfo[0].total_time_for_week
                });
            }
            else {
                req.app.get('db').week_time.insert({
                    total_time_for_week: 0,
                    week_of: startOfWeek
                }).then(function (weekInfo) {
                    res.status(200).send({ success: true, jobs: jobs, total_time: weekInfo.total_time_for_week });
                }).catch(function (err) { return next(err); });
            }
        }).catch(function (err) { return next(err); });
    }).catch(function (err) { return next(err); });
};
/*=====================Helper Function==========================*/
/*===========================Endpoints============================*/
timeRouter.post('/clockin', clockIn);
timeRouter.put('/clockOut', clockOut);
timeRouter.post('/startNewWeek', startNewWeek);
module.exports = timeRouter;
//# sourceMappingURL=timeTracker.js.map