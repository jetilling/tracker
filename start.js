"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var application_1 = require("./application");
var port = 9001;
var api = new application_1.WebApi(express(), port);
api.run();
//# sourceMappingURL=start.js.map