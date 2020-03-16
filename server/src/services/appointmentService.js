const appointmentRepository = require('../database/repositories/appointmentRepository');
/**
 * Sends appointment data off to the AppointmentRepository to create a booking
 *
 * @param {Object} appointmentData
 * @returns {Promise<Object>}
 */
exports.bookAppointment = async appointmentData => {
  return {
    appointment: await appointmentRepository.bookAppointment(appointmentData)
  };
};
