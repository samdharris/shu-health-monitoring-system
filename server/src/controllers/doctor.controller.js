const database = require("../database");
const jwt = require("jsonwebtoken");
const httpCodes = require("http-status-codes");

exports.getDoctors = async (req, res) => {
  try {
    const Doctors = await database
      .knex("users")
      .where("account_type", "ACCOUNT_DOCTOR");
    res.json({ Doctors });
  } catch (error) {
    console.error(error);
    res.status(httpCodes.NOT_FOUND).json({ message: "Doctors don't exist!" });
  }
};
