import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

//--------Components---------//
import { DashboardComponent }                   from '../dashboard/dashboard.component';
import { CreateOrganizationComponent }          from '../organizations/createOrganization/create-organization.component';
import { GrabOrganizationComponent }            from '../organizations/grabOrganizationInfo/grab-organization-info.component';
import { SwitchOrganizationComponent }          from '../organizations/switchOrganizations/switch-organization.component';
import { TeamMenuComponent }                    from '../teams/team-menu/team-menu.component';
import { CreateTeamComponent }                  from '../teams/create-team/create-team.component';
import { ViewTeamComponent }                    from '../teams/viewTeamInfo/view-team-info.component';
import { TeamsDashboardComponent }              from '../teams/teams-dashboard/teams-dashboard.component';
import { OverviewComponent }                    from '../overview/overview.component';

//----------Services----------//
import { AuthGuard }                            from '../services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'dashboard', 
  component: DashboardComponent, 
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      children: [
        { path: 'teams', component: TeamsDashboardComponent },
        { path: 'viewteam/:id', component: ViewTeamComponent},
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