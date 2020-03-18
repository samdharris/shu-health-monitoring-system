const database = require("../database");
const assert = require("assert");
const bcrypt = require("bcryptjs");
exports.addData = async (table, values) => {
  await database.knex(table).insert(values);
  return await database.knex(table).orderBy("id", "desc");
};

exports.getIntegrationForUser = async (userId, integrationId) => {
  return await database
    .knex("user_integrations")
    .where("user_id", userId)
    .where("integration_id", integrationId)
    .first();
};

exports.addData = async (table, values) => {
  await database.knex(table).insert(values);
  return await database
    .knex(table)
    .orderBy("id", "desc")
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
exports.addAddress = async (table, address) => {
  await database.knex(table).insert(address);
  return await database
    .knex(table)
    .orderBy("id", "desc")
    .first();
};
exports.addUser = async (table, user) => {
  const numRounds = parseInt(process.env.SALT_ROUNDS);
  const password = await bcrypt.hash(
    user.password,
    await bcrypt.genSaltSync(numRounds)
  );
  if (user.doctor_id == "") {
    user.doctor_id = null;
  }
  user.password = password;
  await database.knex(table).insert(user);
  return await database
    .knex(table)
    .orderBy("id", "desc")
    .first();
};
exports.assignDoctor = async (table, values) => {
  console.log(values.user_id, values.doctor_id);
  return await database
    .knex(table)
    .where({ id: values.user_id })
    .update({ doctor_id: values.doctor_id });
};
