import * as bcrypt from 'bcrypt-nodejs';

export class Security {

  hash = (itemToEncrypt: string) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) reject(err)

        bcrypt.hash(itemToEncrypt, salt, null, (err, hash) => {
            if (err) reject(err)
            resolve(hash)
        })
      })
      
    })
  }

  compare = (itemToCheck: string, itemToCheckAgainst: string) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(itemToCheck, itemToCheckAgainst, (err, passwordIsCorrect) => {
        if (err) reject(err)
        resolve(passwordIsCorrect)
      })
    })

  }

}