//----Angular Imports----//
import { Injectable, OnInit }                                       from '@angular/core';
import { Http, Headers, RequestOptions, Response }                  from '@angular/http';

//---Other Imports----//
import { ICreateOrganization, IOrganization }                  from '../interfaces';
import { CommonFunctions }                                          from './commonFunctions.service';
import { Observable }                                               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class OrganizationService
{

  constructor(private http: Http,
              private common: CommonFunctions) {}
              
  //---------Properties----------//
  
  /**
   * Organizations belonging to the user
   */
  organizations: IOrganization[]

  /**
   * Active Organization
   */
  activeOrganization: IOrganization

  /**
   * Asks for Organization
   */
  askForActiveOrganization: boolean

  /**
   * Open Create new organization
   */
  openCreateOrganization: boolean

  /**
   * open Switch Organizations component
   */
  openSwitchOrganization: boolean
  
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
  createOrganization(organization: ICreateOrganization) {
    organization.created = new Date()
    const url = '/organization/createOrganization'
    this.http.post(url, organization, this.common.jwt())
            .map(this.common.extractData)
            .subscribe(
              res => {
                this.organizations.push(res.data)
                this.setActiveOrganization(res.data.id)
              }
            )
  }

  getOrganizations() {
    const url = `/organization/getOrganizationInfo/true&${this.currentUserId}`
    this.http.get(url, this.common.jwt())
              .map(this.common.extractData)
              .subscribe(
                res => {
                  this.organizations = res.data
                  let storedOrganization = localStorage.getItem('aorg')
                  // TODO: This is still a little buggy...
                  if (this.activeOrganization === undefined) {
                    if (storedOrganization) this.activeOrganization = this.organizations.find(org => org.id == parseInt(storedOrganization))
                    else this.askForActiveOrganization = true
                  }
                }
              )
  }

  setActiveOrganization(organizationId: string) {
    localStorage.setItem('aorg', organizationId)
    this.activeOrganization = this.organizations.find(org => org.id == parseInt(organizationId))
    this.askForActiveOrganization = false;
    this.openSwitchOrganization = false;
  }

  changeOpenSwitchProperty() {
    if (this.openSwitchOrganization) 
      this.openSwitchOrganization = false
    else this.openSwitchOrganization = true
  }

  changeOpenCreateProperty() {
    if (this.openCreateOrganization) 
      this.openCreateOrganization = false
    else this.openCreateOrganization = true
  }

}