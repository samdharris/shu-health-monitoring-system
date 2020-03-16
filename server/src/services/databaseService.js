const database = require('../database');
const assert = require('assert');

/**
 * Adds the given values to the given table in the database returning the newly added data.
 *
 * @param {String} table
 * @param {Object} values
 * @returns {Promise<Array<Object>>}
 */
exports.addData = async (table, values) => {
  await database.knex(table).insert(values);
  return await database.knex(table).orderBy('id', 'desc');
};

/**
 * Gets the given user integration
 *
 * @param {Number} userId
 * @param {Number} integrationId
 * @returns {<Promise<Object>>}
 */
exports.getIntegrationForUser = async (userId, integrationId) => {
  return await database
    .knex('user_integrations')
    .where('user_id', userId)
    .where('integration_id', integrationId)
    .first();
};

/**
 * Adds the given values to the given table in the database returning the newly added data.
 *
 * @param {String} table
 * @param {Object} values
 * @returns {Promise<Object>}
 */
exports.addData = async (table, values) => {
  await database.knex(table).insert(values);
  return await database
    .knex(table)
    .orderBy('id', 'desc')
    .first();
};

/**
 * Performs the given query on the given table in the database
 *
 * @param {String} table
 * @param {Function} query
 * @returns {Promise<any>}
 */
exports.getData = async (table, query) => await query(database.knex(table));

/**
 * Performs an update on the given table
 *
 * @param {String} tableName
 * @param {String} referenceColumn
 * @param {String} refColumnValue
 * @param {any} data
 *
 * @returns {Promise<any>}
 */
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
