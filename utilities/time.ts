import * as moment from 'moment';

import * as utilTypes from '../typeDefinitions/utilTypes'

export class Time implements utilTypes.ITime {

  findDifference = (startTime: string, endTime: string, differenceType: string): number => {
    let start = moment(startTime)
    let end = moment(endTime)
    let duration = moment(end.diff(start)).format(differenceType)
    return parseInt(duration)
  }

}