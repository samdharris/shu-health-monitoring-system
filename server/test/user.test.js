const app = require("../src/app");
const supertest = require("supertest")(app);
const userSeeder = require("../src/database/seeding/userSeeder");
const addressSeeder = require("../src/database/seeding/addressSeeder");
const database = require("../src/database");
const { ACCOUNT_TYPES } = require("../src/constants");
const faker = require("faker");
const bcrypt = require("bcryptjs");

const path = require("path");

/**
 * Runs before any test block is executed. Used to connect to the database and run migrations.
 * @see https://jestjs.io/docs/en/api#beforeallfn-timeout
 */
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
 * Test block tests the ability to get a single user
 */
describe(`GET - /api/users/1`, () => {
  let data = {};
  /**
   * Runs before any test in this test block is run. Used to seed a user and to get authentication.
   * @see https://jestjs.io/docs/en/api#beforeallfn-timeout
   */
  beforeAll(() => {
    // Login the user
    return userSeeder
      .seedPatient()
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
      });
  });

  it("should return the user successfully", async () => {
    // Arrange
    await addressSeeder.seedAddress(1);
    const user = await database.knex("users").first();
    const address = await database
      .knex("addresses")
      .where("id", user.address_id)
      .first();
    const expected = {
      user,
      address
    };

    // Act
    const response = await supertest
      .get(`/api/users/1`)
      .set("Authorization", `bearer ${data.token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toMatchObject(expected);
  });
});
/**
 * Test block tests the ability to add an user
 */
describe(`POST - /api/users`, () => {
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

  it("should create an user", async () => {
    // Arrange
    const accountType = ACCOUNT_TYPES.ACCOUNT_PATIENT;
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const name = `${firstName} ${lastName}`;
    const user = {
      name: name,
      phone_number: "07777777777",
      email_address: faker.internet.email(firstName, lastName),
      account_type: ACCOUNT_TYPES[accountType],
      doctor_id: null,
      address_id: accountType === ACCOUNT_TYPES.ACCOUNT_PATIENT ? 1 : 2,
      password: process.env.DUMMY_PASSWORD
    };

    // Act
    const response = await supertest
      .post("/api/users")
      .set("Authorization", `bearer ${data.token}`)
      .send(user);
    const newUser = await database
      .knex("users")
      .where("name", name)
      .select();
    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toMatchObject(newUser[0]);
  });
});

/**
 * Test block tests the ability to assign a new doctor_id
 */
describe(`POST - /api/users/1`, () => {
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

  it("should create an user", async () => {
    // Arrange
    const values = {
      user_id: 1,
      doctor_id: 2
    };

    // Act
    const response = await supertest
      .post("/api/users/1")
      .set("Authorization", `bearer ${data.token}`)
      .send(values);
    // Assert
    expect(response.status).toBe(201);
  });
});
