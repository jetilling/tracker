//----Angular Imports----//
import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';

//----Other Imports----//
import { ICreateTeam }                  from '../../interfaces';
import { AppStateService }              from '../../services/appState.service';
import { TeamService }                  from '../../services/team.service';

@Component({
  moduleId: module.id,
  selector: 'create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})

export class CreateTeamComponent implements OnInit
{

  /**
   * Creating new team
   */
  model: ICreateTeam = <any>{};

  constructor(private router: Router,
              private state: AppStateService,
              private teamService: TeamService) {}
  
  ngOnInit() {
    
  }
  
  //----------Properties-----------//
  get showCreateTeam(): boolean {
    return this.state.showCreateTeam
  }

  //----------Methods-----------//

  createTeam() {
    this.teamService.createTeam(this.model)
  }

  showCreateTeamComponent() {
    this.state.showCreateTeam = true
  }

  closeCreateTeamModal(event: any) {
    if (event.target.className === "teamModal") 
      this.state.showCreateTeam = false
  }
  

}