const { ACCOUNT_TYPES } = require("../../constants");
exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("phone_number", 11);
    table.string("email_address", 255);
    table
      .enum("account_type", Object.values(ACCOUNT_TYPES))
      .default(ACCOUNT_TYPES.ACCOUNT_PATIENT);
    table.string("password", 255).notNullable();
    table.integer("doctor_id").unsigned();
    table
      .foreign("doctor_id")
      .references("id")
      .inTable("users");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
