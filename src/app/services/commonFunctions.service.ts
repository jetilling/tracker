//----Angular Imports----//
import { Injectable }                               from '@angular/core';
import { Headers, RequestOptions, Response }        from '@angular/http';
import { Observable }                               from 'rxjs/Observable';

@Injectable()
export class CommonFunctions {

  /**
   * User id for the logged in user
   */
  userId: number

  /**
   * Sets the JSON web token in the request header
   */
  jwt() 
  {
    let userCookie = document.cookie.split("tracker=")[1].split(';')[0];
    if (userCookie && userCookie.split('.').length === 3) {
        let headers = new Headers({ 'Authorization': userCookie});
        return new RequestOptions({ headers: headers });
    }
  }

  /**
   * Formats response from server
   */
  extractData(res: Response) 
  {
    let body = res.json();
    return body || { };
  }

  /**
   * Error handling
   * @param {Response | any} error - Error that was recieved
   */
  handleError (error: Response | any) 
  {
    let errMsg: string;
    if (error instanceof Response) {
      throw error
      // const body = error.json() || '';
      // const err = body.error || JSON.stringify(body);
      // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}