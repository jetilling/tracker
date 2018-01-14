//----Angular Imports----//
import { Injectable, OnInit }                                       from '@angular/core';
import { Http, Headers, RequestOptions, Response }                  from '@angular/http';

//---Other Imports----//
import { ICreateTeam, ITeam }                                       from '../interfaces';
import { CommonFunctions }                                          from './commonFunctions.service';
import { Observable }                                               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TeamService
{

  constructor(private http: Http,
              private common: CommonFunctions) {}
              
  //---------Properties----------//
  
  /**
   * Teams belonging to the user
   */
  teams: ITeam[]
  
  /**
   * Gets the current logged in user id
   */
  get currentUserId(): number {
    return this.common.userId
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
                this.teams.push(res.data)
              }
            )
  }

  getTeams() {
    const url = `/team/createTeam`
    this.http.get(url, this.common.jwt())
              .map(this.common.extractData)
              .subscribe(
                res => {
                  this.teams = res.data
                }
              )
  }

}