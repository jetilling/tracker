/*
    Angular Imports
*/
import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

/*
    Other Imports
*/
import { AuthService }           from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit
{

  constructor(private auth: AuthService,
              private router: Router){}

  /**
   * The JSON web token of the currently logged in user
   */
  user: string = document.cookie.split("tracker=")[1];
  
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
        }
      )
    }
  }
  
  
  logout() {
    this.auth.logout()
  }

}