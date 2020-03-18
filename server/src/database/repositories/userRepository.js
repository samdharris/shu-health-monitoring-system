const databaseService = require("../../services/databaseService");
exports.addUser = async user => await databaseService.addUser("users", user);
