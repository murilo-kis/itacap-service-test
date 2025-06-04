/* eslint-disable */
/**
 * Create a bcrypt hash for the supplied password.
 *
 * Usage: node ./hash-password.js 123456
 *
 **/
const bcrypt = require('bcrypt');

// const password = '123456';
const password = process.argv[2];

// const saltRounds = 10;
// const salt = bcrypt.genSaltSync(saltRounds);
// console.log(`salt:[${salt}]`);

const salt = '$2b$10$vrkeSkmzvV2oyo35FfVcBe'

const hash = bcrypt.hashSync(password, salt);

console.log(hash)
// store hash in your password DB.
