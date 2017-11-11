//----Angular Imports----//
import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

//----Other Imports----//
import { AuthService }          from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'main',
  templateUrl: './main.component.html',

})

export class MainComponent implements OnInit 
{

  constructor(private auth: AuthService,
              private router: Router){}

  /**
   * The JSON web token of the currently logged in user
   */
  tracker: string = document.cookie.split("tracker=")[1];

  ngOnInit() 
  {
    if(this.tracker && this.tracker.split('.').length === 3){
    this.auth.getUser()
      .subscribe(
        res => {
          if (res){
            this.router.navigate(['/dashboard'])
          }
        }
      )
    }
  }

}