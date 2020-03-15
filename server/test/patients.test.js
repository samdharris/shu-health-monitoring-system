const app = require("../src/app");
const supertest = require("supertest")(app);
const userSeeder = require("../src/database/seeding/userSeeder");
const integrationsSeeder = require("../src/database/seeding/integrationsSeeder");
const database = require("../src/database");
const { INTEGRATIONS } = require("../src/constants");
const { ACCOUNT_TYPES } = require("../src/constants");

const path = require("path");

beforeAll(() => {
  database.start();
  /**
   * Run migrations programatically. Works around an issue where they don't run on CI.
   */
  return database.knex.migrate.latest({
    directory: path.join(__dirname, "../src/database/migrations")
  });
});

describe(`GET - /api/patients/1`, () => {
  let data = {};
  beforeAll(() => {
    // Login the user
    return (
      userSeeder
        //.seedPatient()
        .seedDoctor(1)
        .then(() => {
          return database.knex("users").first();
        })
        .then(user => {
          const body = {
            email: user.email_address,
            password: process.env.DUMMY_PASSWORD
          };
          return supertest.post("/login").send(body);
        })
        .then(({ body }) => {
          data.token = body.accessToken;
          data.user = body.user;
        })
    );
  });

  it("should return a user successfully", async () => {
    await userSeeder.seedDoctor(1);
    const doc = await database
      .knex("users")
      .where("account_type", ACCOUNT_TYPES.ACCOUNT_DOCTOR)
      .first();
    await userSeeder.seedPatient(1, doc.id);
    const patient = await database
      .knex("users")
      .where("account_type", ACCOUNT_TYPES.ACCOUNT_PATIENT)
      .first();

    const response = await supertest
      .get(`/api/patients/${doc.id}`)
      .set("Authorization", `bearer ${data.token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("Patients");
    console.log(response.body.Patients);
    expect(response.body.Patients[0]).toMatchObject(patient);
  });
});
