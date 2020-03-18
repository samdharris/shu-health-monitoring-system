const databaseService = require("../../services/databaseService");
exports.addUser = async user => await databaseService.addUser("users", user);
exports.assignDoctor = async values =>
  await databaseService.assignDoctor("users", values);
