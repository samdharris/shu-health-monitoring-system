const database = require("../database");
const jwt = require("jsonwebtoken");
const httpCodes = require("http-status-codes");

exports.getPatients = async (req, res) => {
  try {
    const Patients = await database
      .knex("users")
      .where("doctor_id", req.params.userId);
    res.json({ Patients });
  } catch (error) {
    console.error(error);
    res.status(httpCodes.NOT_FOUND).json({ message: "Doctor doesn't exist!" });
  }
};
