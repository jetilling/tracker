"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//--------Angular Imports---------//
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
//--------Components---------//
var home_component_1 = require("./landing/home/home.component");
var login_component_1 = require("./authentication/login/login.component");
var register_component_1 = require("./authentication/register/register.component");
//--------Services---------//
var auth_service_1 = require("./services/auth.service");
var commonFunctions_service_1 = require("./services/commonFunctions.service");
var users_service_1 = require("./services/users.service");
//--------Routing---------//
var app_routing_module_1 = require("./app-routing.module");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent
            ],
            providers: [
                auth_service_1.AuthService,
                commonFunctions_service_1.CommonFunctions,
                users_service_1.UsersService
            ],
            bootstrap: [home_component_1.HomeComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map