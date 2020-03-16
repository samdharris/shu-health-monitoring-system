const { ACCOUNT_TYPES } = require('../../constants');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const assert = require('assert');
const database = require('../index');
const _ = require('lodash');
database.start();

/**
 * Seeds n many patients
 *
 * @param {Number} n
 * @param {Number} doctorId the associated doctor
 */
exports.seedPatient = async (n = 1, doctorId) => {
  for (let i = 0; i < n; i++) {
    const user = await genUser(ACCOUNT_TYPES.ACCOUNT_PATIENT, doctorId);
    await database.knex('users').insert(user);
  }
  console.log('users seeded!');
};

/**
 * Seeds n doctors
 *
 * @param {Number} n
 */
exports.seedDoctor = async n => {
  console.log(`iterative number: ${n}`);
  for (let i = 0; i < n; i++) {
    const user = await genUser(ACCOUNT_TYPES.ACCOUNT_DOCTOR, null);
    await database.knex('users').insert(user);
  }
};

/**
 * Generates a user object to be inserted in the database
 *
 * @param {String} accountType
 * @param {Number} doctorId
 * @returns {Promise<Object>}
 */
async function genUser(accountType, doctorId) {
  assert(
    !_.isNil(ACCOUNT_TYPES[accountType]),
    `INVALID ACCOUNT TYPE! SHOULD BE ANY OF ${Object.values(ACCOUNT_TYPES).join(
      ','
    )}`
  );

  const firstName = faker.name.firstName();
  const numRounds = parseInt(process.env.SALT_ROUNDS);
  const lastName = faker.name.lastName();
  const password = await bcrypt.hash(
    process.env.DUMMY_PASSWORD,
    await bcrypt.genSaltSync(numRounds)
  );

  return {
    name: `${firstName} ${lastName}`,
    phone_number: '07777777777',
    email_address: faker.internet.email(firstName, lastName),
    account_type: ACCOUNT_TYPES[accountType],
    doctor_id: doctorId,
    address_id: accountType === ACCOUNT_TYPES.ACCOUNT_PATIENT ? 1 : 2,
    password
  };
}
