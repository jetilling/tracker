//----Angular Imports----//
import { Injectable, OnInit }                                       from '@angular/core';
import { Http, Headers, RequestOptions, Response }                  from '@angular/http';

//---Other Imports----//
import { ICreateOrganization }                  from '../interfaces';
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
                console.log(res)
              }
            )
  }

  // /**
  //  * Adds user in database and allUsers array
  //  * @param {IUsersObject} user - Information for the added user
  //  */
  // addUser(user: IUsersObject) 
  // {
  //   const url = '/api/addUser'
  //   this.http.post(url, user, this.common.jwt())
  //           .map(this.common.extractData)
  //           .subscribe(
  //               res => {
  //                   this.allUsers.push(res);

  //               }
  //           )
  // }

}