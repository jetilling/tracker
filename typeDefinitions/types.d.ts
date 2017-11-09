export interface IError {

}

export interface IJobsRaw {
  id: number,
  name: string
}

export interface ITimeRaw {
  id: number
  job_id: number,
  week_time: number,
  clock_in: Date,
  clock_out: Date,
  total_time: number 
}

export interface IWeekInfoRaw {
  total_time_for_week: number
}

export interface IRawUserObject {
  id: number,
  email: string,
  password: string,
  first_name: string,
  activated: boolean,
  email_validated: string,
  validation_token: string,
}

export interface IUserObject {
  id: number,
  email: string,
  first_name: string,
  token: string
}