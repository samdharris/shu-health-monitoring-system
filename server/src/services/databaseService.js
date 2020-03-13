const database = require('../database');
const assert = require('assert');

exports.getIntegrationForUser = async (userId, integrationId) => {
  return await database
    .knex('user_integrations')
    .where('user_id', userId)
    .where('integration_id', integrationId)
    .first();
};

exports.getData = async (table, query) => await query(database.knex(table));

exports.updateData = async (
  tableName,
  referenceColumn,
  refColumnValue,
  data
) => {
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
    .where(referenceColumn, refColumnValue)
    .update(data);

  return await database
    .knex(tableName)
    .where(referenceColumn, refColumnValue)
    .first();
};
