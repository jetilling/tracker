import * as moment from 'moment';

import * as utilTypes from '../typeDefinitions/utilTypes'

export class Time implements utilTypes.ITime {

  findDifference = (startTime: string, endTime: string, differenceType: 'Q'): number => {
    let start = moment(new Date(startTime))
    let end = moment(new Date(endTime))
    let duration = end.diff(start, differenceType)

    return duration
  }

}