"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
//----Angular Imports----//
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var commonFunctions_service_1 = require("./commonFunctions.service");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var UsersService = (function () {
    function UsersService(http, common) {
        this.http = http;
        this.common = common;
        /**
         * Whether or not the current user information is loaded
         */
        this.currentUserInfoLoaded = false;
        /**
         * Shows add user modal if true
         */
        this.showAddUser = false;
        /**
         * Shows confirmation if user was successfully added
         */
        this.userSuccessfullyAdded = false;
    }
    //--------Methods----------//
    /**
     * Adds user in database and allUsers array
     * @param {IUsersObject} user - Information for the added user
     */
    UsersService.prototype.addUser = function (user) {
        var _this = this;
        var url = '/api/addUser';
        this.http.post(url, user, this.common.jwt())
            .map(this.common.extractData)
            .subscribe(function (res) {
            _this.allUsers.push(res);
        });
    };
    /**
     * Information for the currently logged in user
     */
    UsersService.prototype.getLoggedInUser = function () {
        var _this = this;
        var userId = localStorage.getItem('opusId');
        var url = '/api/getLoggedInUser/' + userId;
        this.http.get(url, this.common.jwt())
            .map(this.common.extractData)
            .subscribe(function (res) {
            _this.currentUser = res[0];
            _this.currentUserInfoLoaded = true;
        });
    };
    /**
     * Gets all users from database
     */
    UsersService.prototype.getUsers = function () {
        var _this = this;
        var url = '/api/getUsers';
        this.http.get(url, this.common.jwt())
            .map(this.common.extractData)
            .subscribe(function (res) {
            _this.allUsers = res;
        });
    };
    /**
     * Verifies added user email does not already exist
     * @param {IRegisterUser} user - User information i.e. email
     */
    UsersService.prototype.verifyEmail = function (user) {
        var invalidEmail = false;
        this.allUsers.forEach(function (element) {
            if (element.email === user.email)
                return invalidEmail = true;
        });
        return invalidEmail;
    };
    UsersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            commonFunctions_service_1.CommonFunctions])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map