exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('password', 255).notNullable();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
