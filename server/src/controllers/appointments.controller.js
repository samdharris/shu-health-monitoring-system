const appointmentsService = require('../services/appointmentService');
const jwt = require('jsonwebtoken');
const httpCodes = require('http-status-codes');
/**
 * POST - /api/appointments
 *
 * Makes an appointment for the current user
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.createAppointment = async (req, res) => {
  try {
    const response = await appointmentsService.bookAppointment({
      ...req.body,
      user_id: req.user.id
    });
    res.status(httpCodes.CREATED).json(response);
  } catch (error) {
    console.log(error);
    res.status(httpCodes.BAD_REQUEST).send();
  }
};