import * as moment from 'moment';

export class Time {


  findDifference = (startTime: string, endTime: string, differenceType: string) => {
    let start = moment(startTime)
    let end = moment(endTime)
    let duration = moment(end.diff(start)).format(differenceType)
    return parseInt(duration)
  }

}