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
  dashboardLoaded: boolean = false

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

  /**
   * User is logged in
   */
  userLoggedIn: boolean

  /**
   * The attempted url
   */
  redirectUrl: string

  //-------------------------------------------------Projects---------------------------------------------------------//

  /**
   * Open Create New Project component
   */
  showCreateProject: boolean

  /**
   * Active Projects
   */
  projects: types.IProject[] = []

  //-------------------------------------------------Teams--------------------------------------------------------//

  /**
   * Teams that belong to the active organization
   */
  teams: types.ITeam[] = []

  /**
   * Information for the active team - this team
   * will be the one that is active on the dashboard
   */
  activeTeam: types.ITeam

  /**
   * Open Create New Team component
   */
  showCreateTeam: boolean

  /**
   * Teams have been loaded
   */
  teamsLoaded: boolean

  /**
   * Members in active team
   */
  membersInActiveTeam: types.ISafeUserObject[]

  /**
   * Show the Add Member To Team Component
   */
  showAddMemberToTeamComponent: boolean

  /**
   * Ask to Add Outside member
   */
  askToAddOutsideMember: boolean
              
  //-----------------------------------------------Organizations---------------------------------------------------//
  
  /**
   * Organizations belonging to the user
   */
  organizations: types.IOrganization[] = []

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

  /**
   * Members belonging to Active Organization
   */
  membersOfActiveOrganization: types.ISafeUserObject[]
  

  
}