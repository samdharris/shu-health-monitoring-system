const databaseService = require("../../services/databaseService");
/**
 * Adds the given address
 *
 * @param {Number} address
 *
 * @returns {Promise<Object>}
 */
exports.addAddress = async address =>
  await databaseService.addAddress("addresses", address);
