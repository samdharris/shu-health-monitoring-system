const { ACCOUNT_TYPES } = require("../../constants");
const faker = require("faker");
const bcrypt = require("bcryptjs");
const assert = require("assert");
const database = require("../index");
const _ = require("lodash");
database.start();

exports.seedHomeAddress = async (n = 1) => {
  for (let i = 0; i < n; i++) {
    const address = await genaddress(ACCOUNT_TYPES.ACCOUNT_PATIENT);
    await database.knex("addresses").insert(address);
  }
  console.log("Home Address seeded!");
};
exports.seedGPAddress = async (n = 1) => {
  console.log("GP Address seeded!");
};

async function genUser(accountType) {
  const address_line = faker.name.firstName();
  const postcode = parseInt(process.env.SALT_ROUNDS);

  return {
    address_line: `${firstName} ${lastName}`,
    postcode: "07777777777"
  };
}
