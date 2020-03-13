const databaseService = require('../../services/databaseService');
exports.bookAppointment = async booking =>
  await databaseService.addData('appointments', booking);
