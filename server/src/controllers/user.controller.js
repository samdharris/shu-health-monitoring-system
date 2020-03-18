const database = require("../database");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const httpCodes = require("http-status-codes");
const userService = require("../services/userService");

exports.index = async (req, res) => {
  const users = await database.knex("users").select("*");
  res.json({
    message: "Users",
    users
  });
};

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
