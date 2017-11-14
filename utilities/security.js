"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt-nodejs");
var Security = (function () {
    function Security() {
        this.encrypt = function (itemToEncrypt) {
            return new Promise(function (resolve, reject) {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err)
                        reject(err);
                    bcrypt.hash(itemToEncrypt, salt, null, function (err, hash) {
                        if (err)
                            reject(err);
                        resolve(hash);
                    });
                });
            });
        };
        this.decrypt = function (itemToCheck, itemToCheckAgainst) {
            return new Promise(function (resolve, reject) {
                bcrypt.compare(itemToCheck, itemToCheckAgainst, function (err, passwordIsCorrect) {
                    if (err)
                        reject(err);
                    resolve(passwordIsCorrect);
                });
            });
        };
    }
    return Security;
}());
exports.Security = Security;
//# sourceMappingURL=security.js.map