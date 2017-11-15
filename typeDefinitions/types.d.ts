import * as express from 'express';

export interface expressRequest extends express.Request {
  user: IUserObject
}

export interface IError {

}

export interface IJobsRaw {
  id: number,
  name: string
}

export interface ITimeRaw {
  id: number,
  user_id: number,
  job_id: number,
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

export interface IJobs {
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
  id: number,
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  activated: boolean,
  email_validated: string,
  validation_token: string,
}

export interface IUserObject {
  id: number,
  email: string,
  firstname: string,
  lastname: string,
  token: string
}

export interface IAddMemberRes {
  
}

export interface ITeamRes {
  id: number,
  name: string,
  description: string
}