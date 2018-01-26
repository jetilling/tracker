//--------Angular Imports---------//
import { NgModule }                             from '@angular/core';
import { CommonModule }                         from '@angular/common';
import { ReactiveFormsModule, FormsModule }     from '@angular/forms';
import { HttpModule, JsonpModule }              from '@angular/http';

//--------Components---------//
import { DashboardComponent }                   from '../dashboard/dashboard.component';
import { CreateOrganizationComponent }          from '../organizations/createOrganization/create-organization.component';
import { GrabOrganizationComponent }            from '../organizations/grabOrganizationInfo/grab-organization-info.component';
import { SwitchOrganizationComponent }          from '../organizations/switchOrganizations/switch-organization.component';
import { TeamMenuComponent }                    from '../teams/team-menu/team-menu.component';
import { CreateTeamComponent }                  from '../teams/create-team/create-team.component';
import { GrabTeamComponent }                    from '../teams/grabTeamInfo/grab-team-info.component';
import { OverviewComponent }                    from '../overview/overview.component';

//--------Services---------//
import { AppStateService }                      from '../services/appState.service';
import { AuthService }                          from '../services/auth.service';
import { CommonFunctions }                      from '../services/commonFunctions.service';
import { UsersService }                         from '../services/users.service';
import { OrganizationService }                  from '../services/organizations.service';
import { TeamService }                          from '../services/team.service';
import { SetUpService }                         from '../services/setUp.service';

//--------Routing---------//
import { DashboardRoutingModule }               from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    CreateOrganizationComponent,
    GrabOrganizationComponent,
    SwitchOrganizationComponent,
    TeamMenuComponent,
    CreateTeamComponent,
    GrabTeamComponent,
    OverviewComponent
  ],
  providers: [
    AuthService,
    CommonFunctions,
    UsersService,
    OrganizationService,
    TeamService,
    AppStateService,
    SetUpService
  ]
})

export class DashboardModule {}