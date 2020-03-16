const appointmentsService = require('../services/appointmentService');
const jwt = require('jsonwebtoken');
const httpCodes = require('http-status-codes');
exports.createAppointment = async (req, res) => {
  try {
    const split = req.header('Authorization').split(' ');
    const token = split[split.length - 1];
    const { userId } = jwt.decode(token);
    const response = await appointmentsService.bookAppointment({
      ...req.body,
      user_id: userId
    });
    res.status(httpCodes.CREATED).json(response);
  } catch (error) {
    console.log(error);
    res.status(httpCodes.BAD_REQUEST).send();
  }
};
