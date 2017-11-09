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
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var commonFunctions_service_1 = require("./commonFunctions.service");
var users_service_1 = require("./users.service");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var AuthService = (function () {
    function AuthService(http, router, usersService, common) {
        this.http = http;
        this.router = router;
        this.usersService = usersService;
        this.common = common;
        /**
         * Show message that user isn't validated
         */
        this.showValidationMessage = false;
    }
    Object.defineProperty(AuthService.prototype, "currentUser", {
        /**
         * Gets the current user from the users service
         */
        get: function () {
            return this.usersService.currentUser;
        },
        /**
         * Sets the current user from the users service
         */
        set: function (val) {
            this.usersService.currentUser = val;
        },
        enumerable: true,
        configurable: true
    });
    //--------------Methods---------------//
    /**
     * Retrieves current user's id number
     */
    AuthService.prototype.getUser = function () {
        var url = '/api/me';
        return this.http.get(url, this.common.jwt())
            .map(this.common.extractData)
            .catch(this.common.handleError);
    };
    /**
     * Sends User's information to server to be verified then calls setCookies to log them in
     * @param {IRegisterUser} user - User information i.e. email, password
     */
    AuthService.prototype.login = function (user) {
        var _this = this;
        var url = '/auth/login';
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(url, JSON.stringify(user), options)
            .map(this.common.extractData)
            .subscribe(function (res) {
            _this.setCookies(res, false);
        }, function (err) {
            if (err.status === 401) {
                _this.emailOrPasswordInvalid = true;
            }
            else if (err.status === 400) {
                _this.showValidationMessage = true;
            }
        });
    };
    /**
     * Sends User's information to server to be added in database and sent a validation email
     * @param {IRegisterUser} user - User information i.e. first name, last name, email, password
     */
    AuthService.prototype.register = function (user) {
        var _this = this;
        var url = '/auth/register';
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(url, JSON.stringify(user), options)
            .map(this.common.extractData)
            .subscribe(function (res) {
            _this.usersService.currentUser = res;
            _this.router.navigate(['/validate']);
        }, function (err) {
            if (err.status === 409) {
                _this.emailIsAlreadyTaken = true;
            }
        });
    };
    /**
     * Logs User out
     */
    AuthService.prototype.logout = function () {
        localStorage.removeItem('opusId');
        document.cookie = 'Opus_User=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        return true;
    };
    /**
     * Sends token from validation email to server to be verified
     * @param {string} token - Token from validation email
     */
    AuthService.prototype.validateUser = function (token) {
        this.userToken = token;
        var validationToken = { token: token };
        var url = '/auth/validate';
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(url, JSON.stringify(validationToken), options)
            .map(this.common.extractData)
            .catch(this.common.handleError);
    };
    /**
     * Sends token from validation email to server to be verified then logs them in
     * @param {string} token - Token from validation email
     */
    AuthService.prototype.validateUserAndLogin = function (token) {
        this.userToken = token;
        var validationToken = { token: token };
        var url = '/auth/validateAndLogin';
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(url, JSON.stringify(validationToken), options)
            .map(this.common.extractData)
            .catch(this.common.handleError);
    };
    /**
     * Sends email to server so a recovery email may be sent to them
     * @param {IEmail} email - User's Email
     */
    AuthService.prototype.submitResetEmail = function (email) {
        var url = "/auth/sendPasswordResetUrl";
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(url, JSON.stringify(email), options)
            .map(this.common.extractData)
            .catch(this.common.handleError);
    };
    /**
     * Sends new password to server
     * @param {IUser} user - User's new password
     */
    AuthService.prototype.resetPassword = function (user) {
        var _this = this;
        var url = "/auth/resetPassword";
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.put(url, JSON.stringify(user), options)
            .map(this.common.extractData)
            .subscribe(function (res) {
            user.email = res.email;
            _this.login(user);
        }, function (error) {
            _this.common.handleError;
        });
    };
    /**
     * Sets a cookie with JSON web token and stores logged in user id in localstorage
     * Navigates user to correct page depending on if they are new or not
     * @param {IRegisterUser} res - Response from server
     * @param {boolean} newUser - Trigger if user is new or not
     */
    AuthService.prototype.setCookies = function (res, newUser) {
        if (res && res.token) {
            document.cookie = "Opus_User=" + res.token + "; Path=/;";
            localStorage.setItem('opusId', res.id + '');
            this.currentUser = res;
        }
        newUser ? this.router.navigate(['/validate']) : this.router.navigate(['/dashboard']);
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            users_service_1.UsersService,
            commonFunctions_service_1.CommonFunctions])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map