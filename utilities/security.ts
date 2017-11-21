import * as argon2 from 'argon2';

import * as utilTypes from '../typeDefinitions/utilTypes'

export class Security implements utilTypes.ISecurity {

  hash = (itemToEncrypt: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const hashOptions = {
        timeCost: 4, memoryCost: 13, parallelism: 2, type: argon2.argon2id
      };

      argon2.hash(itemToEncrypt, hashOptions).then((hash: string) => {
          resolve(hash)
      })
    })
  }

  compare = (itemToCheck: string, itemToCheckAgainst: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      argon2.verify(itemToCheck, itemToCheckAgainst).then((passwordIsCorrect: boolean) => {
        resolve(passwordIsCorrect)
      }).catch((err) => console.log(err))
    })

  }

}