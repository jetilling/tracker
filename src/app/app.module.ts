//--------Angular Imports---------//
import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }     from '@angular/forms';
import { HttpModule, JsonpModule }              from '@angular/http';

//----------Modules-----------//
import { DashboardModule }                      from './dashboard/dashboard.module'

//--------Components---------//
import { MainComponent }                        from './main/main.component';
import { HomeComponent }                        from './landing/home/home.component';
import { LoginComponent }                       from './authentication/login/login.component';
import { RegisterComponent }                    from './authentication/register/register.component';
import { RegisterNewOrganizationComponent }     from './authentication/register-new-organization/register-new-organization.component';

//--------Services---------//
import { AppStateService }                      from './services/appState.service';
import { AuthService }                          from './services/auth.service';
import { AuthGuard }                            from './services/auth-guard.service';
import { CommonFunctions }                      from './services/commonFunctions.service';
import { UsersService }                         from './services/users.service';
import { OrganizationService }                  from './services/organizations.service';
import { TeamService }                          from './services/team.service';
import { SetUpService }                         from './services/setUp.service';

//--------Routing---------//
import { AppRoutingModule }                     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    DashboardModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegisterNewOrganizationComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
    CommonFunctions,
    UsersService,
    OrganizationService,
    TeamService,
    AppStateService,
    SetUpService
  ],
  bootstrap: [ MainComponent ]
})

export class AppModule {}