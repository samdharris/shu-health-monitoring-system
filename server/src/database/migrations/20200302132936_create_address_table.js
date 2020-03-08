exports.up = function(knex) {
  return knex.schema.createTable("addresses", table => {
    table.increments("id");
    table.string("address_line", 255).notNullable();
    table.string("postcode", 9);
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("addresses");
};