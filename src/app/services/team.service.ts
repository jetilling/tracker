//----Angular Imports----//
import { Injectable, OnInit }                                       from '@angular/core';
import { Http, Headers, RequestOptions, Response }                  from '@angular/http';

//---Other Imports----//
import { ICreateTeam, ITeam, IOrganization }                                       from '../interfaces';
import { AppStateService }                                          from './appState.service';
import { CommonFunctions }                                          from './commonFunctions.service';
import { Observable }                                               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TeamService
{

  constructor(private http: Http,
              private common: CommonFunctions,
              private state: AppStateService) {}
              
  //---------Properties----------//
  
  /**
   * Gets the current logged in user id
   */
  get currentUserId(): number {
    return this.common.userId
  }

  get activeOrganization(): IOrganization {
    return this.state.activeOrganization
  }

  get activeOrganizationLoaded(): boolean {
    return this.state.activeOrganizationLoaded
  }

  //--------Methods----------//

  /**
   * Sends organization to backend
   * @param {ICreateOrganization} organization - Information about organization
   */
  createTeam(team: ICreateTeam) {
    const url = '/team/createTeam'
    this.http.post(url, team, this.common.jwt())
            .map(this.common.extractData)
            .subscribe(
              res => {
                this.state.teams.push(res.data)
              }
            )
  }

  findAndSetActiveTeam(teamId: string) {
    if (teamId) {
      let id = parseInt(teamId)
      this.state.teams.forEach(team => {
        if (team.id == id) {
          this.getMemebersOfTeam(teamId)
          this.state.activeTeam = team 
        }
      })
    } else this.state.activeTeam = []
  }

  getMemebersOfTeam(teamId: string) {
    const url = `/team/getTeamMembers/${teamId}`
    this.http.get(url, this.common.jwt())
        .map(this.common.extractData)
        .subscribe(
          res => {
            if (res.success) {
              this.state.membersInActiveTeam = res.data
            }
          }
        )
  }

}