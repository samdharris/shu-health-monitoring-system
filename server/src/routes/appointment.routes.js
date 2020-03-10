const { Router } = require('express');
const router = Router();
const controller = require('../controllers/appointments.controller');

router.post('/', controller.createAppointment);

module.exports = router;
