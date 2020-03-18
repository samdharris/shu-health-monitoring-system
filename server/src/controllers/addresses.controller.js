const database = require("../database");
const jwt = require("jsonwebtoken");
const httpCodes = require("http-status-codes");
const addressService = require("../services/addressService");
/**
 * GET - /api/appointments
 *
 * gets a list of all addresses
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await database.knex("addresses");
    res.json({ addresses });
  } catch (error) {
    console.error(error);
    res.status(httpCodes.NOT_FOUND).json({ message: "addresses don't exist!" });
  }
};
/**
 * POST - /api/appointments
 *
 * Creates and address
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.addAddress = async (req, res) => {
  try {
    const response = await addressService.addAddress({
      ...req.body
    });
    res.status(httpCodes.CREATED).json(response);
  } catch (error) {
    console.log(error);
    res.status(httpCodes.BAD_REQUEST).send();
  }
};
