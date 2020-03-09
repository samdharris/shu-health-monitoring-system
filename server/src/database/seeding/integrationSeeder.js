const { ACCOUNT_TYPES } = require("../../constants");
const faker = require("faker");
const bcrypt = require("bcryptjs");
const assert = require("assert");
const database = require("../index");
const _ = require("lodash");
database.start();

exports.seedIntegration = async (n = 1) => {
  const integration = await genIntegrationFitbit();
  await database.knex("integrations").insert(integration);
  for (let i = 0; i < n; i++) {
    integration = await genIntegration();
    await database.knex("integrations").insert(integration);
  }
  console.log("integrations seeded!");
};
async function genIntegrationFitbit() {
  return {
    name: `Fitbit`
  };
}
async function genIntegration() {
  const name = faker.company();
  return {
    name: `integration: ${Name}`
  };
}
