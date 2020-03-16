const { ACCOUNT_TYPES } = require('../../constants');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const assert = require('assert');
const database = require('../index');
const _ = require('lodash');
database.start();

exports.seedAddress = async (n = 2) => {
  for (let i = 0; i < n; i++) {
    const address = await genaddress();
    await database.knex('addresses').insert(address);
  }
  console.log('Addresses seeded!');
};
async function genaddress() {
  return {
    address_line_1: faker.address.streetAddress(),
    city: faker.address.city(),
    county: faker.address.county(),
    post_code: faker.address.zipCode()
  };
}
