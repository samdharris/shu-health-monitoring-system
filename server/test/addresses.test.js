const app = require("../src/app");
const supertest = require("supertest")(app);
const addressSeeder = require("../src/database/seeding/addressSeeder");
const userSeeder = require("../src/database/seeding/userSeeder");
const faker = require("faker");
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
 * Test block tests the ability to get all addresses
 */
describe(`GET - /api/addresses`, () => {
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

  it("should return all addresses", async () => {
    // Arrange
    await addressSeeder.seedAddress(2);

    const address = await database.knex("addresses").first();
    // Act
    const response = await supertest
      .get(`/api/addresses`)
      .set("Authorization", `bearer ${data.token}`);
    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("addresses");
    expect(response.body.addresses[0]).toMatchObject(address);
  });
});
/**
 * Test block tests the ability to add an addresses
 */
describe(`POST - /api/addresses`, () => {
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

  it("should create an address", async () => {
    // Arrange
    const address = {
      address_line_1: faker.address.streetAddress(),
      address_line_2: "",
      address_line_3: "",
      city: faker.address.city(),
      county: faker.address.county(),
      post_code: faker.address.zipCode()
    };

    // Act
    const response = await supertest
      .post("/api/addresses")
      .set("Authorization", `bearer ${data.token}`)
      .send(address);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("address");
    expect(response.body.address).toEqual(expect.objectContaining(address));
  });
});
