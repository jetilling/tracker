//----Angular Imports----//
import { Component, OnInit }                    from '@angular/core';
import { Router }                               from '@angular/router';

//----Other Imports----//
import { ICreateOrganization, IOrganization }   from '../../interfaces'
import { AppStateService }                      from '../../services/appState.service';
import { TeamService }                          from '../../services/team.service';

@Component({
  moduleId: module.id,
  selector: 'grab-team',
  templateUrl: './grab-team-info.component.html',
  styleUrls: ['./grab-team-info.component.css']
})

export class GrabTeamComponent implements OnInit
{

  constructor(private router: Router,
              private state: AppStateService,
              private teamService: TeamService) {}
  
  ngOnInit() {

  }
  
  //----------Properties-----------//


  // //----------Methods-----------//



}