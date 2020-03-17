const database = require("../database");
const jwt = require("jsonwebtoken");
const httpCodes = require("http-status-codes");

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await database.knex("addresses");
    res.json({ addresses });
  } catch (error) {
    console.error(error);
    res.status(httpCodes.NOT_FOUND).json({ message: "addresses don't exist!" });
  }
};
