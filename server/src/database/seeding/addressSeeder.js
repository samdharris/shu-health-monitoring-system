const { ACCOUNT_TYPES } = require("../../constants");
const faker = require("faker");
const bcrypt = require("bcryptjs");
const assert = require("assert");
const database = require("../index");
const _ = require("lodash");
database.start();

exports.seedAddress = async (n = 1) => {
  for (let i = 0; i < n; i++) {
    const address = await genaddress();
    await database.knex("addresses").insert(address);
  }
  console.log("Address seeded!");
};
async function genaddress(accountType) {
  const address_line = faker.address.streetAddress("###");
  const postcode = faker.address.zipCode("###-###");

  return {
    address_line: address_line,
    postcode: postcode
  };
}
