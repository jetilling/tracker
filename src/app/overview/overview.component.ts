//----Angular Imports----//
import { Component, OnInit }                    from '@angular/core';
import { Router }                       from '@angular/router';

//----Other Imports----//
import { ICreateOrganization }          from '../interfaces'
import { AppStateService }              from '../services/appState.service';
import { TeamService }                  from '../services/team.service';

@Component({
  moduleId: module.id,
  selector: 'over-view',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit
{

  constructor(private router: Router,
              private state: AppStateService,
              private teamService: TeamService) {}
  
  ngOnInit() {
    
  }
  
  //----------Properties-----------//



  //----------Methods-----------//
  

}