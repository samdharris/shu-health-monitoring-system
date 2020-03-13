exports.up = function(knex) {
  return knex.schema.createTable('appointments', table => {
    table.increments('id');
    table
      .integer('user_id')
      .unsigned()
      .notNullable();

    table.datetime('appointment_date').notNullable();
    table.text('reason', 'longtext');

    table
      .foreign('user_id')
      .references('id')
      .inTable('users');

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('appointments');
};
