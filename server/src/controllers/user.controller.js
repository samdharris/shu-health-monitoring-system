const database = require("../database");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const httpCodes = require("http-status-codes");
const userService = require("../services/userService");

/**
 * GET - /api/users
 * Gets all users of the system
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.index = async (req, res) => {
  const users = await database.knex("users").select("*");
  res.json({
    message: "Users",
    users
  });
};

/**
 * GET - /api/users/:id
 * Gets a given user
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.getUser = async (req, res) => {
  try {
    const user = await database
      .knex("users")
      .where("users.id", req.params.userId)
      .first();

    if (_.isNil(user)) {
      return res.status(httpCodes.NOT_FOUND).send();
    }

    const address = await database
      .knex("addresses")
      .where("id", user.address_id)
      .first();

    res.json({ user, address });
  } catch (error) {
    console.error(error);
    res.status(httpCodes.NOT_FOUND).json({ message: "User doesn't exist!" });
  }
};
/**
 * POST - /api/users
 * Adds a given user to the system
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.addUser = async (req, res) => {
  try {
    const response = await userService.addUser({
      ...req.body
    });
    res.status(httpCodes.CREATED).json(response);
  } catch (error) {
    console.log(error);
    res.status(httpCodes.BAD_REQUEST).send();
  }
};
/**
 * POST - /api/users/:id
 * Takes the given doctor_id value and updates patient with it.
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.assignDoctor = async (req, res) => {
  try {
    const response = await userService.assignDoctor({
      ...req.body
    });
    res.status(httpCodes.CREATED).json(response);
  } catch (error) {
    console.error(error);
    res.status(httpCodes.NOT_FOUND).json({ message: "User doesn't exist!" });
  }
};
