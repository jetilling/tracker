//----Angular Imports----//
import { Component, OnInit }                    from '@angular/core';
import { Router }                       from '@angular/router';

//----Other Imports----//
import { ICreateOrganization }          from '../../interfaces'
import { AppStateService }              from '../../services/appState.service';
import { TeamService }                  from '../../services/team.service';


@Component({
  moduleId: module.id,
  selector: 'team-menu',
  templateUrl: './team-menu.component.html',
  styleUrls: ['./team-menu.component.css']
})

export class TeamMenuComponent implements OnInit
{

  constructor(private router: Router,
              private state: AppStateService,
              private teamService: TeamService) {}
  
  ngOnInit() {
    
  }
  
  //----------Properties-----------//
  get showCreateTeam(): boolean {
    return this.state.showCreateTeam
  }

  get teamsLoaded(): boolean {
    return this.state.teamsLoaded
  }

  get teams() {
    return this.state.teams
  }

  //----------Methods-----------//
  showCreateTeamComponent() {
    this.state.showCreateTeam = true
  }

  closeCreateTeamModal(event: any) {
    if (event.target.className === "teamModal") 
      this.state.showCreateTeam = false
  }
  

}