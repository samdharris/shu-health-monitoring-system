const app = require("../src/app");
const supertest = require("supertest")(app);
const userSeeder = require("../src/database/seeding/userSeeder");
const database = require("../src/database");

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

/**
 * Test block tests the ability to get all doctors
 */
describe(`GET - /api/doctors`, () => {
  let data = {};
  /**
   * Runs before any test in this test block is run. Used to seed a user and to get authentication.
   * @see https://jestjs.io/docs/en/api#beforeallfn-timeout
   */
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

  it("should get all doctors", async () => {
    // Arrange

    await userSeeder.seedDoctor(1);
    const doc = await database
      .knex("users")
      .where("account_type", ACCOUNT_TYPES.ACCOUNT_DOCTOR)
      .first();
    await userSeeder.seedPatient(1, doc.id);
    const doctor = await database
      .knex("users")
      .where("account_type", ACCOUNT_TYPES.ACCOUNT_DOCTOR)
      .first();

    // Act
    const response = await supertest
      .get("/api/doctors")
      .set("Authorization", `bearer ${data.token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("Doctors");
    expect(response.body.Doctors[0]).toMatchObject(doctor);
  });
});
