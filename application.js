"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Import npm packages
*/
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var moment = require("moment");
var massive = require("massive");
/*
    Import controllers
*/
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
        app.use('/time', timeTracker);
        app.use('/job', addJob);
        app.use('/alert', textService);
        app.get('/', function (req, res, next) {
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
        });
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