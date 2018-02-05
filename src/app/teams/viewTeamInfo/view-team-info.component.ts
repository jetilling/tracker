//----Angular Imports----//
import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute, Params }               from '@angular/router';

//----Other Imports----//
import { ITeam, ISafeUserObject }   from '../../interfaces'
import { AppStateService }                      from '../../services/appState.service';
import { TeamService }                          from '../../services/team.service';

@Component({
  moduleId: module.id,
  selector: 'view-team',
  templateUrl: './view-team-info.component.html',
  styleUrls: ['./view-team-info.component.css']
})

export class ViewTeamComponent implements OnInit
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