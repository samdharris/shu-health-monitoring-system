const userRepository = require("../database/repositories/userRepository");
/**
 * Sends user data off to the userRepository to create a user
 *
 * @param {Object} user
 * @returns {Promise<Object>}
 */
exports.addUser = async user => {
  return {
    user: await userRepository.addUser(user)
  };
};
/**
 * Sends id pair off to the userRepository to change a users doctor_id
 *
 * @param {Object} values
 * @returns {Promise<Object>}
 */
exports.assignDoctor = async values =>
  await userRepository.assignDoctor(values);
