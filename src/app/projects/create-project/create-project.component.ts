//----Angular Imports----//
import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';

//----Other Imports----//
import { ICreateTeam }                  from '../../interfaces';
import { AppStateService }              from '../../services/appState.service';
import { ProjectService }                  from '../../services/project.service';

@Component({
  moduleId: module.id,
  selector: 'create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})

export class CreateProjectComponent implements OnInit
{

  /**
   * Creating new team
   */
  model: ICreateTeam = <any>{};

  constructor(private router: Router,
              private state: AppStateService,
              private teamService: ProjectService) {}
  
  ngOnInit() {
    
  }
  
  //----------Properties-----------//
  get showCreateProject(): boolean {
    return this.state.showCreateProject
  }

  //----------Methods-----------//

  createTeam() {
    this.teamService.createProject(this.model)
  }

  showCreateProjectComponent() {
    this.state.showCreateTeam = true
  }

  hideCreateProjectComponent(event: any) {
    if (event.target.className === "projectModal") 
      this.state.showCreateProject = false
  }
  

}