const databaseService = require("../../services/databaseService");
/**
 * Adds the given user
 *
 * @param {Number} user
 *
 * @returns {Promise<Object>}
 */
exports.addUser = async user => await databaseService.addUser("users", user);
/**
 * Updates the given user with the given doctor_id
 *
 * @param {Number} values
 *
 * @returns {Promise<Object>}
 */
exports.assignDoctor = async values =>
  await databaseService.assignDoctor("users", values);
