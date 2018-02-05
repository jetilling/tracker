export interface IEmail {
  email: string
}

export interface IUserNames {
  firstName: string
  lastName?: string
}

export interface IUser extends IRegisterUser {
  password: string
  verifyPassword: string
}

/**
* Class for login/Register User object
*/
export interface IRegisterUser {
  id: number;
  email: string;
  firstName: string;
  phoneNumber: string;
  password: string;
  token?: string;
  validated?: boolean
}

/**
* Interface for Users list
*/
export interface IUsersObject {
  id: number;
  email: string;
  firstName: string;
  phoneNumber: string;
  login_dates?: Date[];
}

export interface ISafeUserObject {
  id: number,
  email: string,
  firstname: string,
  lastname: string,
  email_validated: boolean,
  activated: boolean,
  level: number,
  token?: string
}

/**
 * Interface for creating organization
 */
export interface ICreateOrganization {
  name: string,
  description: string,
  created?: Date
}

export interface ICreateTeam {
  name: string,
  description: string
}

export interface ITeam {
  id: number,
  name: string,
  description: string
}

export interface IAddMemberToTeam {
  
}

export interface IProject {

}

export interface ICreateProject {
  
}

/**
 * Interface for organizations
 */
export interface IOrganization {
  id: number,
  name: string,
  description: string,
  start_date: Date
}
