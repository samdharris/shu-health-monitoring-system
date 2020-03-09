exports.up = function(knex) {
  return knex.schema.createTable("user_integrations", table => {
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
      .integer("value")
      .unsigned()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("integrations_data");
};
