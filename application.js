"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Import npm packages
*/
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var path = require("path");
var massive = require("massive");
var express = require("express");
/*
    Import controllers
*/
var auth = require("./controllers/authentication");
var timeTracker = require("./controllers/timeTracker");
var addJob = require("./controllers/addJob");
var textService = require("./controllers/textService");
/*
    Export WebApi Class
*/
var WebApi = (function () {
    function WebApi(app, port) {
        this.app = app;
        this.port = port;
        dotenv.config({ path: '.env' });
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }
    /**
     *
     * @param app
     */
    WebApi.prototype.configureMiddleware = function (app) {
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use("/node_modules", express.static(path.resolve(__dirname, './node_modules')));
        app.use(express.static(__dirname + '/src'));
        massive(process.env.DB_CONNECT).then(function (db) {
            app.set('db', db);
        });
    };
    /**
     * Configure Routes
     *
     * @description
     * @param app
     */
    WebApi.prototype.configureRoutes = function (app) {
        app.use('/auth', auth);
        app.use('/time', timeTracker);
        app.use('/job', addJob);
        app.use('/alert', textService);
    };
    /**
     *
     * @description
     */
    WebApi.prototype.run = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log('Listening on ', _this.port);
        });
    };
    return WebApi;
}());
exports.WebApi = WebApi;
//# sourceMappingURL=application.js.map