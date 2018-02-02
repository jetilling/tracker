//----Angular Imports----//
import { Component, OnInit }            from '@angular/core';
import { Router, ActivatedRoute, Params }               from '@angular/router';

//----Other Imports----//
import { ITeam, ISafeUserObject }          from '../../interfaces'
import { AppStateService }              from '../../services/appState.service';
import { TeamService }                  from '../../services/team.service';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'teams-dashboard',
  templateUrl: './teams-dashboard.component.html',
  styleUrls: ['./teams-dashboard.component.css']
})

export class TeamsDashboardComponent implements OnInit
{

  constructor(private router: Router,
              private route: ActivatedRoute,
              private state: AppStateService,
              private teamService: TeamService) {}
  
  ngOnInit() {
    this.route.paramMap
      .subscribe(params => this.teamService.findAndSetActiveTeam(params.get('id')))
  }
  
  //----------Properties-----------//

  get activeTeam(): ITeam | ITeam[] {
    return this.state.activeTeam
  }

  get membersInActiveTeam(): ISafeUserObject[] {
    return this.state.membersInActiveTeam
  }

  get showAddMemberToTeam(): boolean {
    return this.state.showAddMemberToTeamComponent
  }

  //----------Methods-----------//
  showAddMemberToTeamComponent() {
    this.state.showAddMemberToTeamComponent = true
  }

}