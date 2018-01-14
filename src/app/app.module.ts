//--------Angular Imports---------//
import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }     from '@angular/forms';
import { HttpModule, JsonpModule }              from '@angular/http';

//--------Components---------//
import { MainComponent }                        from './main/main.component';
import { HomeComponent }                        from './landing/home/home.component';
import { LoginComponent }                       from './authentication/login/login.component';
import { RegisterComponent }                    from './authentication/register/register.component';
import { DashboardComponent }                   from './dashboard/dashboard.component';
import { CreateOrganizationComponent }          from './organizations/createOrganization/create-organization.component';
import { GrabOrganizationComponent }            from './organizations/grabOrganizationInfo/grab-organization-info.component';
import { TeamMenuComponent }                    from './teams/team-menu/team-menu.component';
import { CreateTeamComponent }                  from './teams/create-team/create-team.component';

//--------Services---------//
import { AuthService }                          from './services/auth.service';
import { CommonFunctions }                      from './services/commonFunctions.service';
import { UsersService }                         from './services/users.service';
import { OrganizationService }                  from './services/organizations.service';
import { TeamService }                          from './services/team.service';

//--------Routing---------//
import { AppRoutingModule }                     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CreateOrganizationComponent,
    GrabOrganizationComponent,
    TeamMenuComponent,
    CreateTeamComponent,
  ],
  providers: [
    AuthService,
    CommonFunctions,
    UsersService,
    OrganizationService,
    TeamService
  ],
  bootstrap: [ MainComponent ]
})

export class AppModule {}