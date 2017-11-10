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
var AuthenticateComponent = (function () {
    function AuthenticateComponent(router) {
        this.router = router;
        /**
         * Show the login form on initial load
         */
        this.showLogin = true;
        /**
         * Hide the register form on initial load
         */
        this.showRegister = false;
    }
    //--------------Methods---------------//
    AuthenticateComponent.prototype.showLoginForm = function () {
        this.showLogin = true;
        this.showRegister = false;
        console.log(this.showLogin);
    };
    AuthenticateComponent.prototype.showRegisterForm = function () {
        this.showLogin = false;
        this.showRegister = true;
        console.log(this.showLogin);
    };
    AuthenticateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'authenticate',
            templateUrl: './authenticate.component.html',
            styleUrls: ['./authenticate.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AuthenticateComponent);
    return AuthenticateComponent;
}());
exports.AuthenticateComponent = AuthenticateComponent;
//# sourceMappingURL=authenticate.component.js.map