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
var auth_service_1 = require("../../services/auth.service");
var LoginComponent = (function () {
    function LoginComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        //-----------Properties--------------//
        /**
         * The user's information
         */
        this.model = {};
        /**
         * Disables submit if true
         */
        this.loading = false;
    }
    Object.defineProperty(LoginComponent.prototype, "showValidationMessage", {
        /**
         * Gets showValidationMessage from auth service
         */
        get: function () {
            return this.auth.showValidationMessage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "emailOrPasswordInvalid", {
        /**
         * Gets emailOrPasswrodInvalid from auth service
         */
        get: function () {
            return this.auth.emailOrPasswordInvalid;
        },
        enumerable: true,
        configurable: true
    });
    //--------------Methods---------------//
    /**
     * Sends user's information to auth service to login
     */
    LoginComponent.prototype.login = function () {
        this.loading = true;
        this.auth.login(this.model);
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map