//----Angular Imports----//
import { Component, OnInit }                    from '@angular/core';
import { Router }                       from '@angular/router';

//----Other Imports----//
import { ICreateOrganization }          from '../../interfaces'
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
              private teamService: TeamService) {}
  
  ngOnInit() {
    
  }
  
  //----------Properties-----------//

  get teams() {
    return this.teamService.teams
  }

  //----------Methods-----------//
  

}