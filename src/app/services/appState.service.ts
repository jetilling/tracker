//----Angular Imports----//
import { Injectable}         from '@angular/core';

//---Other Imports----//
import * as types            from '../interfaces';

@Injectable()
export class AppStateService
{

  constructor() {}

  /**
   * dashboard has been loaded
   */
  dashboardLoaded: boolean

  //------------------------------------------------Users-------------------------------------------------------//

  /**
   * User Information has been loaded
   */
  userLoaded: boolean

  /**
   * Info for logged in user
   */
  userInfo: types.IUsersObject

  /**
   * Id for the logged in user
   */
  userId: string

  //-------------------------------------------------Jobs---------------------------------------------------------//

  //-------------------------------------------------Teams--------------------------------------------------------//

  /**
   * Teams the user belonging to the organization
   */
  teams: types.ITeam[] = []

  /**
   * Open Create New Team component
   */
  showCreateTeam: boolean

  /**
   * Teams have been loaded
   */
  teamsLoaded: boolean
              
  //-----------------------------------------------Organizations---------------------------------------------------//
  
  /**
   * Organizations belonging to the user
   */
  organizations: types.IOrganization[]

  /**
   * Active Organization
   */
  activeOrganization: types.IOrganization

  /**
   * Asks for Organization
   */
  askForActiveOrganization: boolean

  /**
   * Open Create new organization component
   */
  showCreateOrganization: boolean

  /**
   * show Switch Organizations component
   */
  showSwitchOrganization: boolean

  /**
   * Active Organization is loaded
   */
  activeOrganizationLoaded: boolean
  

  
}