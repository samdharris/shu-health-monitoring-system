const database = require('../database');
const assert = require('assert');

exports.updateData = async (userId, tableName, referenceColumn, id, data) => {
  assert(
    await database.knex.schema.hasTable(tableName),
    `Table: ${tableName} doesn't exist!`
  );
  assert(
    await database.knex.schema.hasColumn(tableName, referenceColumn),
    `Column: ${referenceColumn} doesn't exist in table ${tableName}`
  );
  await database
    .knex(tableName)
    .where('user_id', userId)
    .where(referenceColumn, id)
    .update(data);
};
