exports.up = function(knex) {
  return knex.schema.createTable("integrations_data", table => {
    table.increments("id");
    table
      .integer("user_integration_id")
      .unsigned()
      .notNullable();
    table
      .foreign("user_integration_id")
      .references("id")
      .inTable("user_integrations");

    table
      .float("value", 3)
      .unsigned()
      .notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("integrations_data");
};
