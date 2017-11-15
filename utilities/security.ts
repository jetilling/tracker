import * as argon2 from 'argon2';

export class Security {

  hash = (itemToEncrypt: string) => {
    return new Promise((resolve, reject) => {
      const hashOptions = {
        timeCost: 4, memoryCost: 13, parallelism: 2, type: argon2.argon2id
      };

      argon2.hash(itemToEncrypt, hashOptions).then(hash => {
          resolve(hash)
      })
    })
  }

  compare = (itemToCheck: string, itemToCheckAgainst: string) => {
    return new Promise((resolve, reject) => {
      argon2.verify(itemToCheck, itemToCheckAgainst).then(passwordIsCorrect => {
        resolve(passwordIsCorrect)
      })
    })

  }

}