import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

//--------Components---------//
import { DashboardComponent }                   from '../dashboard/dashboard.component';
import { CreateOrganizationComponent }          from '../organizations/createOrganization/create-organization.component';
import { GrabOrganizationComponent }            from '../organizations/grabOrganizationInfo/grab-organization-info.component';
import { SwitchOrganizationComponent }          from '../organizations/switchOrganizations/switch-organization.component';
import { TeamMenuComponent }                    from '../teams/team-menu/team-menu.component';
import { CreateTeamComponent }                  from '../teams/create-team/create-team.component';
import { GrabTeamComponent }                    from '../teams/grabTeamInfo/grab-team-info.component';
import { TeamsDashboardComponent }              from '../teams/teams-dashboard/teams-dashboard.component';
import { OverviewComponent }                    from '../overview/overview.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, children: [
    {
      path: '',
      children: [
        { path: 'teams', component: TeamsDashboardComponent },
        { path: 'team/:id', component: TeamsDashboardComponent},
        { path: '', component: OverviewComponent }
      ]
    }
    ] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class DashboardRoutingModule {}