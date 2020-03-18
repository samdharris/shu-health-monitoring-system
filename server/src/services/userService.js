const userRepository = require("../database/repositories/userRepository");

exports.addUser = async user => {
  return {
    user: await userRepository.addUser(user)
  };
};
