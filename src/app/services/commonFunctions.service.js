"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//----Angular Imports----//
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var CommonFunctions = (function () {
    function CommonFunctions() {
    }
    /**
     * Sets the JSON web token in the request header
     */
    CommonFunctions.prototype.jwt = function () {
        var opusUser = document.cookie.split("Opus_User=")[1];
        if (opusUser && opusUser.split('.').length === 3) {
            var headers = new http_1.Headers({ 'Authorization': opusUser });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    /**
     * Formats response from server
     */
    CommonFunctions.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    /**
     * Error handling
     * @param {Response | any} error - Error that was recieved
     */
    CommonFunctions.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    CommonFunctions = __decorate([
        core_1.Injectable()
    ], CommonFunctions);
    return CommonFunctions;
}());
exports.CommonFunctions = CommonFunctions;
//# sourceMappingURL=commonFunctions.service.js.map