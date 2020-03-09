const { ACCOUNT_TYPES } = require("../../constants");
const faker = require("faker");
const bcrypt = require("bcryptjs");
const assert = require("assert");
const database = require("../index");
const _ = require("lodash");
database.start();

exports.seedData = async n => {
  return knex("user_integrations")
    .pluck("id")
    .then(userIds => {
      const data_integrations = [];
      for (let i = 0; i < n; i++) {
        data_integrations.push({
          user_integration_id: faker.random.arrayElement(userIds),
          value: faker.random.number({ min: 50, max: 1000 })
        });
      }
      console.log("data seeded!");
      return knex("data_integrations").insert(data_integrations);
    });
};
