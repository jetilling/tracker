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
  opusUser: string = document.cookie.split("Opus_User=")[1];

  ngOnInit() 
  {
    if(this.opusUser && this.opusUser.split('.').length === 3){
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