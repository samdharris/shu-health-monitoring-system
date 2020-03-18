const database = require("../database");
const httpCodes = require("http-status-codes");

exports.getAllPatients = async (req, res) => {
  try {
    const Patients = await database.knex("users");
    res.json({ Patients });
  } catch (error) {
    console.error(error);
    res.status(httpCodes.NOT_FOUND).json({ message: "Patients don't exist!" });
  }
};
/**
 * GET /api/patients/:id
 *
 * Gets all the patients for the given doctor
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.getPatients = async (req, res) => {
  try {
    const Patients = await database
      .knex("users")
      .where("doctor_id", req.params.userId);
    res.json({ Patients });
  } catch (error) {
    console.error(error);
    res.status(httpCodes.NOT_FOUND).json({ message: "Patient doesn't exist!" });
  }
};
