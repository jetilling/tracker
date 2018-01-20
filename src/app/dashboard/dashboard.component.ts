/*
    Angular Imports
*/
import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

/*
    Other Imports
*/
import { AuthService }           from '../services/auth.service';
import { CommonFunctions }       from '../services/commonFunctions.service';
import { OrganizationService }   from '../services/organizations.service';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit
{

  constructor(private auth: AuthService,
              private orgService: OrganizationService,
              private common: CommonFunctions,
              private router: Router){}

  /**
   * The JSON web token of the currently logged in user
   */
  user: string = document.cookie.split("tracker=")[1].split(';')[0];

  // /**
  //  * Trigger to open and close Create Organization component
  //  */
  // get openCreateOrganization() {
  //   return this.orgService.openCreateOrganization
  // }
  
  userInfo: string


  ngOnInit() 
  {
    if(this.user && this.user.split('.').length === 3){
    this.auth.getUser()
      .subscribe(
        res => {
          if (res){
            this.userInfo = JSON.stringify(res)
          }
        },
        err => {
          if (err) this.auth.logout()
        }
      )

    }
    if (localStorage.getItem('trackerId')) this.common.getUserIdFromLocalStorage()
  }
  
  
  logout() {
    this.auth.logout()
  }

}