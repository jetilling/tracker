"use strict";
/*
    Import npm packages
*/
var express = require("express");
var dotenv = require("dotenv");
var twilio = require("twilio");
/*=====================Configuration======================*/
dotenv.config({ path: '.env' });
var textServiceRouter = express.Router();
/*=====================Functions==========================*/
var sendTestText = function (req, res, next) {
    var client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    client.messages.create({
        body: "Just wondering if you've started working on Hal's job?",
        to: 'recipient number here',
        from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
    })
        .then(function (message) { return res.send(message.sid); });
};
/*=====================Helper Function==========================*/
/*===========================Endpoints============================*/
textServiceRouter.get('/textService', sendTestText);
module.exports = textServiceRouter;
//# sourceMappingURL=textService.js.map