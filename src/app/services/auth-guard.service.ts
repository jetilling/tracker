import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';
import { AppStateService }                              from './appState.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, 
              private state: AppStateService,
              private router: Router) {}

  /**
   * The JSON web token of the currently logged in user
   */
  tracker: string = document.cookie.split("tracker=")[1].split(';')[0];

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url)
  }

  checkLogin(url: string): boolean {

    if (this.state.userLoggedIn) return true
    
    // Nice try if you think you're going to hack this... I got'chu! 
    if(this.tracker && this.tracker.split('.').length === 3) {
      if (localStorage.getItem('trackerId')) return true
    }

    // Store the attempted URL for redirecting
    this.state.redirectUrl = url
    
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
