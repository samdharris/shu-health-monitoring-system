const addressRepository = require("../database/repositories/addressRepository");
/**
 * Sends address data off to the addressRepository to create a address
 *
 * @param {Object} address
 * @returns {Promise<Object>}
 */
exports.addAddress = async address => {
  return {
    address: await addressRepository.addAddress(address)
  };
};
