/*
    Angular Imports
*/
import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

/*
    Other Imports
*/
import { AppStateService }       from '../services/appState.service';
import { AuthService }           from '../services/auth.service';
import { CommonFunctions }       from '../services/commonFunctions.service';
import { OrganizationService }   from '../services/organizations.service';
import { SetUpService }          from '../services/setUp.service';

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
              private state: AppStateService,
              private setUpService: SetUpService,
              private router: Router){}

  /**
   * The JSON web token of the currently logged in user
   */
  user: string = document.cookie.split("tracker=")[1].split(';')[0];

  ngOnInit() 
  {
    if (!this.state.dashboardLoaded && !this.state.userInfo) {
      if(this.user && this.user.split('.').length === 3){
        this.auth.getUser()
      }
    }
    // this.setUpService.fetchData("LoadOrganization")
    if (localStorage.getItem('trackerId')) this.common.getUserIdFromLocalStorage()
  }

  
  
  logout() {
    this.auth.logout()
  }

  get userLoaded() {
    return this.state.userLoaded
  }

  get dashboardLoaded() {
    return this.state.dashboardLoaded
  }

  get activeOrganization() {
    return this.state.activeOrganization
  }

  get askForActiveOrganization(): boolean {
    return this.state.askForActiveOrganization
  }

}