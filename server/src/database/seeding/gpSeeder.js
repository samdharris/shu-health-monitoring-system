const { ACCOUNT_TYPES } = require("../../constants");
const faker = require("faker");
const bcrypt = require("bcryptjs");
const assert = require("assert");
const database = require("../index");
const _ = require("lodash");
database.start();

exports.seedGP = async (n = 1) => {
  for (let i = 0; i < n; i++) {
    const gp = await genGP();
    await database.knex("addresses").insert(gp);
  }
  console.log("Address seeded!");
};
async function genGP(accountType) {
  const name = faker.address.streetName();
  const address_id = ""; //find out how to generate addresses and use their ID's

  return {
    address_line: address_line,
    postcode: postcode
  };
}
