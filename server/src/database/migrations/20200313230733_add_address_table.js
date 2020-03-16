exports.up = function(knex) {
  return knex.schema.createTable('addresses', table => {
    table.increments('id');
    table.string('address_line_1').notNullable();
    table.string('address_line_2');
    table.string('address_line_3');
    table.string('city');
    table.string('county');
    table.string('post_code');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('addresses');
};
