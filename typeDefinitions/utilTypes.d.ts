export interface ISecurity {
  compare: (hashedPassword: string, userPassword: string) => Promise<boolean>,
  hash: (userPassword: string) => Promise<string>
}

export interface ITime {
  findDifference: (startTime: string, endTime: string, differenceType: string) => number
}