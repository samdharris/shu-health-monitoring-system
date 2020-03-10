const database = require('../database');
exports.addData = async (table, values) => {
  await database.knex(table).insert(values);
  return await database
    .knex(table)
    .orderBy('id', 'desc')
    .first();
};
