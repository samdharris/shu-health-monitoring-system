const userSeeder = require("./userSeeder");
const integrationsSeeder = require("./integrationsSeeder");
const database = require("../index");
const { ACCOUNT_TYPES } = require("../../constants");
exports.run = async (n = 1) => {
  await userSeeder.seedDoctor(n);
  const doc = await database
    .knex("users")
    .where("account_type", ACCOUNT_TYPES.ACCOUNT_DOCTOR)
    .first();
  await userSeeder.seedPatient(n, doc.id);
  const user = await database
    .knex("users")
    .where("account_type", ACCOUNT_TYPES.ACCOUNT_PATIENT)
    .first();
  await integrationsSeeder.seedIntegrations();
  const integrations = await database.knex("integrations").select("*");
  await integrationsSeeder.seedUserIntegration(integrations[0].id, user.id);
  await integrationsSeeder.seedUserIntegration(integrations[1].id, user.id);
  console.log("Seeding done!");
  process.exit(0);
};
