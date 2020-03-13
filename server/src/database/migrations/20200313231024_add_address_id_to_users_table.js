exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.integer('address_id').unsigned();

    table
      .foreign('address_id')
      .references('id')
      .inTable('addresses');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', async table => {
    table.dropColumn('address_id');
  });
};
