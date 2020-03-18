const databaseService = require("../../services/databaseService");
exports.addAddress = async address =>
  await databaseService.addAddress("addresses", address);
