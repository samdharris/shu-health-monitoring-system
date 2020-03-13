exports.up = function(knex) {
  return knex.schema.createTable("user_integrations", table => {
    table.increments("id");
    table
      .integer("integration_id")
      .unsigned()
      .notNullable();
    table
      .integer("user_id")
      .unsigned()
      .notNullable();

    table
      .foreign("user_id")
      .references("id")
      .inTable("users");
    table
      .foreign("integration_id")
      .references("id")
      .inTable("integrations");

    table.string("serial").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_integrations");
};
