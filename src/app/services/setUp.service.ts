//----Angular Imports----//
import { Injectable, OnInit }                                       from '@angular/core';
import { Http, Headers, RequestOptions, Response }                  from '@angular/http';

//---Other Imports----//
import { ICreateTeam, ITeam, IOrganization }                                       from '../interfaces';
import { AppStateService }                                          from './appState.service';
import { CommonFunctions }                                          from './commonFunctions.service';
import { TeamService }                                              from './team.service';
import { Observable }                                               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SetUpService
{

  constructor(private http: Http,
              private common: CommonFunctions,
              private teamService: TeamService,
              private state: AppStateService) {}
              
  //---------Properties----------//
  
  get activeOrganizationLoaded(): boolean {
    return this.state.activeOrganizationLoaded
  }

  get teamsLoaded(): boolean {
    return this.state.teamsLoaded
  }

  get activeOrganization(): IOrganization {
    return this.state.activeOrganization
  }
  

  //--------Methods----------//

  fetchData(action) {
      switch (action) {
        case "LoadOrganization":
          this.getOrganizations()
          break;
        case "LoadTeams":
          this.getTeams()
        case "PaintDashboard":
          this.state.dashboardLoaded = true
          break;
        default:
          console.log(`Couldn't find case for ${action}`)
      }
  }

  setActiveOrganization(organizationId: string) {
    localStorage.setItem('aorg', organizationId)
    this.state.activeOrganization = this.state.organizations.find(org => org.id == parseInt(organizationId))
    this.state.askForActiveOrganization = false;
    this.state.showSwitchOrganization = false;
    this.state.activeOrganizationLoaded = true
    this.fetchData("LoadTeams")
  }

  getOrganizations() {
    const url = `/organization/getOrganizationInfo/true&${this.state.userId}`
    this.http.get(url, this.common.jwt())
              .map(this.common.extractData)
              .subscribe(
                res => {
                  this.state.organizations = res.data
                  let storedOrganization = localStorage.getItem('aorg')
                  // TODO: This is still a little buggy...
                  if (this.state.activeOrganization === undefined) {
                    if (storedOrganization) {
                      this.state.activeOrganization = this.state.organizations.find(org => org.id == parseInt(storedOrganization))
                      this.state.activeOrganizationLoaded = true
                      this.fetchData("LoadTeams")
                    }
                    else this.state.askForActiveOrganization = true
                  }
                }
              )
  }

  getTeams() {
    const url = `/team/teamsInOrganization/${this.activeOrganization.id}`
    this.http.get(url, this.common.jwt())
              .map(this.common.extractData)
              .subscribe(
                res => {
                  if (res.success) {
                    this.state.teams = res.data
                    this.state.teamsLoaded = true
                  }
                  this.fetchData("PaintDashboard")
                }
              )
  }

}