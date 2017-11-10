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
//----Other Imports----//
var auth_service_1 = require("../services/auth.service");
var MainComponent = (function () {
    function MainComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        /**
         * The JSON web token of the currently logged in user
         */
        this.opusUser = document.cookie.split("Opus_User=")[1];
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.opusUser && this.opusUser.split('.').length === 3) {
            this.auth.getUser()
                .subscribe(function (res) {
                if (res) {
                    _this.router.navigate(['/dashboard']);
                }
            });
        }
    };
    MainComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'main',
            templateUrl: './main.component.html',
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            router_1.Router])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map