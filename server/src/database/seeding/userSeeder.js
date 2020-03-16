const { ACCOUNT_TYPES } = require("../../constants");
const faker = require("faker");
const bcrypt = require("bcryptjs");
const assert = require("assert");
const database = require("../index");
const _ = require("lodash");
database.start();

exports.seedPatient = async (n = 1, userId) => {
  for (let i = 0; i < n; i++) {
    const user = await genUser(ACCOUNT_TYPES.ACCOUNT_PATIENT, userId);
    await database.knex("users").insert(user);
  }
  console.log("users seeded!");
};

exports.seedDoctor = async n => {
  console.log(`iterative number: ${n}`);
  for (let i = 0; i < n; i++) {
    const user = await genUser(ACCOUNT_TYPES.ACCOUNT_DOCTOR, null);
    await database.knex("users").insert(user);
  }
};

async function genUser(accountType, userId) {
  assert(
    !_.isNil(ACCOUNT_TYPES[accountType]),
    `INVALID ACCOUNT TYPE! SHOULD BE ANY OF ${Object.values(ACCOUNT_TYPES).join(
      ","
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
    phone_number: "07777777777",
    email_address: faker.internet.email(firstName, lastName),
    account_type: ACCOUNT_TYPES[accountType],
    doctor_id: userId,
    address_id: accountType === ACCOUNT_TYPES.ACCOUNT_PATIENT ? 1 : 2,
    password
  };
}
