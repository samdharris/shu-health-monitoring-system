exports.up = function(knex) {
  return knex.schema.table('integrations_data', table => {
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.table('integrations_data', table => {
    table.dropTimestamps();
  });
};
