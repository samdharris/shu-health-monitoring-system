exports.up = function(knex) {
  return knex.schema.createTable("glucose_level", table => {
    table.increments("id");
    table
      .bigInteger("medical_data_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("medical_data")
      .notNullable();
    table.float("glucose_level").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("glucose_level");
};
