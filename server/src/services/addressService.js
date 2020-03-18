const addressRepository = require("../database/repositories/addressRepository");

exports.addAddress = async address => {
  return {
    address: await addressRepository.addAddress(address)
  };
};
