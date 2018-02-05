//----Angular Imports----//
import { Injectable, OnInit }                                       from '@angular/core';
import { Http, Headers, RequestOptions, Response }                  from '@angular/http';

//---Other Imports----//
import { ICreateProject, IProject}                                  from '../interfaces';
import { AppStateService }                                          from './appState.service';
import { CommonFunctions }                                          from './commonFunctions.service';
import { Observable }                                               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService
{

  constructor(private http: Http,
              private common: CommonFunctions,
              private state: AppStateService) {}
              
  //---------Properties----------//
  

  //--------Methods----------//

  /**
   * Sends new project to backend
   * @param {ICreateProject} project - Information about new project
   */
  createProject(project: ICreateProject) {
    const url = '/project/createProject'
    this.http.post(url, project, this.common.jwt())
            .map(this.common.extractData)
            .subscribe(
              res => {
                this.state.projects.push(res.data)
              }
            )
  }
  
}