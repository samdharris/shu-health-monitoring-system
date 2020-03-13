const appointmentRepository = require('../database/repositories/appointmentRepository');
exports.bookAppointment = async appointmentData => {
  return {
    appointment: await appointmentRepository.bookAppointment(appointmentData)
  };
};
