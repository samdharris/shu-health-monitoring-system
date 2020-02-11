const { ACCOUNT_TYPES } = require('../../constants');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const assert = require('assert');
const database = require('../index');
const _ = require('lodash');
database.start();

exports.seedPatient = async n => {
  const users = [];
  for (let i = 0; i < n; i++) {
    const user = await genUser(ACCOUNT_TYPES.ACCOUNT_PATIENT);
    users.push(user);
  }
  await seed(users);
};

exports.seedDoctor = async n => {
  console.log(`iterative number: ${n}`);
  const users = [];
  for (let i = 0; i < n; i++) {
    const user = await genUser(ACCOUNT_TYPES.ACCOUNT_DOCTOR);
    users.push(user);
  }
  await seed(users);
};

async function seed(users) {
  await database.knex('users').insert(users);
}

async function genUser(accountType) {
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
    password
  };
}
