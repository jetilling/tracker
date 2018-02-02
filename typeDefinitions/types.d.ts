import * as express from 'express';

export interface expressRequest extends express.Request {
  user: number
}

export interface IError {
  error?: any
}

export interface ITimeRaw {
  id: number,
  user_id: number,
  project_id: number,
  week_time: number,
  clock_in: Date,
  clock_out: Date,
  total_time: number 
}

export interface IWeek {
  id: number,
  user_id: number,
  week_starting: Date,
  week_ending: Date,
  total_time_for_week: number
}

export interface IProjects {
  id: number,
  name: string,
  description: string,
  start_date: Date,
  end_date: Date,
  estimated_duration: number,
  estimated_cost: number,
  total_seconds_worked: number
}

export interface IRawUserObject {
  id?: number,
  email: string,
  phone_number: string,
  password: string,
  firstname: string,
  lastname: string,
  activated: boolean,
  email_validated: boolean,
  validation_token: string,
  level: number,
  registration_complete: boolean
}

export interface IRetrievedUser {
  success: boolean,
  data: ISafeUserObject
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

export interface IAddMemberRes {
  
}

export interface ITeam {
  id: number,
  name: string,
  description: string
}

export interface ITeamToUsers {
  id: number,
  team_id: number,
  user_id: number,
  level: number
}

export interface IOrganization {
    id: number,
    name: string,
    description: string,
    start_date: Date
}

export interface ITeamToOrganization {
  id: number,
  team_id: number,
  organization_id: number
}

export interface IUserToOrganization {
  id: number,
  user_id: number,
  organization_id: number
}