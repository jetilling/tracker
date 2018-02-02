//----Angular Imports----//
import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';

//----Other Imports----//
import { IAddMemberToTeam }             from '../../interfaces';
import { AppStateService }              from '../../services/appState.service';
import { TeamService }                  from '../../services/team.service';
import { OrganizationService }          from '../../services/organizations.service';

@Component({
  moduleId: module.id,
  selector: 'add-member-to-team',
  templateUrl: './add-member-to-team.component.html',
  styleUrls: ['./add-member-to-team.component.css']
})

export class AddMemberToTeamComponent implements OnInit
{

  /**
   * Creating new team
   */
  model: IAddMemberToTeam = <any>{};

  memberInfo: string

  constructor(private router: Router,
              private state: AppStateService,
              private orgService: OrganizationService,
              private teamService: TeamService) {}
  
  ngOnInit() {
    this.orgService.getMemberList()
  }
  
  //----------Properties-----------//


  //----------Methods-----------//

  hideAddMemberToTeamComponent() {
    this.state.showAddMemberToTeamComponent = false
  }

  filterMemberList() {
    console.log(this.memberInfo)
    this.teamService.getMemberList(this.memberInfo)
  }

}