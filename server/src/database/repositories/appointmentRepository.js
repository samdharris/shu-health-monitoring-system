const databaseService = require('../../services/databaseService');

/**
 * Sends a booking the to database for storage
 *
 * @param {Object} booking
 * @returns {Promise<Object>}
 */
exports.bookAppointment = async booking =>
  await databaseService.addData('appointments', booking);
