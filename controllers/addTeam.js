"use strict";
/*
    Import npm packages
*/
var express = require("express");
var dotenv = require("dotenv");
var randToken = require("rand-token");
/*=====================Configuration======================*/
dotenv.config({ path: '.env' });
var teamRouter = express.Router();
/*=====================Functions==========================*/
var createTeam = function (req, res, next) {
    var teamName = req.body.teamName;
    var description = req.body.description;
    req.app.get('db').teams.insert({
        name: teamName,
        description: description
    }).then(res.status(200).send({ success: true }))
        .catch(function (err) { return next(err); });
};
var addMember = function (req, res, next) {
    var db = req.app.get('db');
    var teamId = req.body.teamId;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var owner = req.body.owner;
    if (teamId) {
        /*
          First we need to grab the team name so we can send it in the new member emails
        */
        db.teams.findOne({ id: teamId }).then(function (team) {
            var teamName = team.name;
            var creatorName = req.user.firstname;
            /*
              See if user exists
            */
            db.users.findOne({ email: email }).then(function (result) {
                /*
                  If the user exists insert them in the users_to_team table.
                  Send the user an email stating they have been added
                */
                if (result) {
                    db.users_to_team.insert({
                        team_id: teamId,
                        user_id: result.id,
                        owner: owner
                    }).then(function (response) {
                        // **TODO** We need to notify user via email they were added to group
                        res.status(200).send({ success: true });
                    }).catch(function (err) { return next(err); });
                }
                else {
                    var token = randToken.generate(16);
                    /*
                      Create a new user with minimal information
                    */
                    db.users.insert({
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                        activated: 'FALSE',
                        email_validated: 'TRUE',
                        level: owner ? 1 : 2
                    }).then(function (user) {
                        /*
                          Add newly created user to the team
                          Send the user an email stating they have been added
                        */
                        db.users_to_team.insert({
                            team_id: teamId,
                            user_id: user.id,
                            owner: owner
                        }).then(function () {
                            // **TODO** We need to notify user via email they were added to group
                            // This email should tell them they were added to the group, but it should also say they need to
                            // create/activate their account
                            res.status(200).send({ success: true });
                        }).catch(function (err) { return next(err); });
                    }).catch(function (err) { return next(err); });
                }
            });
        });
    }
    else {
        res.send({ message: 'Please either choose or create a team first' });
    }
};
/*=====================Helper Function==========================*/
/*===========================Endpoints============================*/
teamRouter.post('/createTeam', createTeam);
teamRouter.post('/addMember', addMember);
module.exports = teamRouter;
//# sourceMappingURL=addTeam.js.map