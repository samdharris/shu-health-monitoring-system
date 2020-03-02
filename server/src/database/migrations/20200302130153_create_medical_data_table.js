exports.up = function(knex) {
  return knex.schema.createTable("medical_data", table => {
    table.increments("id");
    table
      .bigInteger("patient_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("users");
    table
      .bigInteger("doctor_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("users");
    table.text("details", "longtext");
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("medical_data");
};
