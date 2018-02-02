//----Angular Imports----//
import { Injectable, OnInit }                                       from '@angular/core';
import { Http, Headers, RequestOptions, Response }                  from '@angular/http';

//---Other Imports----//
import { ICreateOrganization, IOrganization }                       from '../interfaces';
import { CommonFunctions }                                          from './commonFunctions.service';
import { AppStateService }                                          from './appState.service';
import { SetUpService }                                             from './setUp.service';
import { Observable }                                               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class OrganizationService
{

  constructor(private http: Http,
              private common: CommonFunctions,
              private setUpService: SetUpService,
              private state: AppStateService) {}
              
  //---------Properties----------//

  //--------Methods----------//

  /**
   * Sends organization to backend
   * @param {ICreateOrganization} organization - Information about organization
   */
  createOrganization(organization: ICreateOrganization) {
    organization.created = new Date()
    const url = '/organization/createOrganization'
    this.http.post(url, organization, this.common.jwt())
            .map(this.common.extractData)
            .subscribe(
              res => {
                this.state.organizations.push(res.data)
                this.setUpService.setActiveOrganization(res.data.id)
              }
            )
  }

  getMemberList() {
    if (!this.state.membersOfActiveOrganization) {
      const url = `/organization/getMembers/${this.state.activeOrganization.id}`
      this.http.get(url, this.common.jwt())
                .map(this.common.extractData)
                .subscribe(
                  res => {
                    if (res.success) {
                      console.log(res.data)
                    }
                  }
                )
    }
  }

  changeOpenSwitchProperty() {
    if (this.state.showSwitchOrganization) 
      this.state.showSwitchOrganization = false
    else this.state.showSwitchOrganization = true
  }

  changeOpenCreateProperty() {
    if (this.state.showCreateOrganization) 
      this.state.showCreateOrganization = false
    else this.state.showCreateOrganization = true
  }

}