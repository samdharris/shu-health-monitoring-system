/**
 * The backend API router. Stores all the api routes
 */
const {
    Router
} = require('express');

const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const patientRoutes = require('./patient.routes');
const appointmentRoutes = require('./appointment.routes');
const integrationRoutes = require('./integration.routes');
const userIntegrationRoutes = require('./userintegration.routes');
const router = Router();

// import the middleware
const validateUser = require('../middleware/validateUser')

router.use('/api/users', validateUser, userRoutes);
router.use('/api/patients', validateUser, patientRoutes);
router.use('/api/appointments', validateUser, appointmentRoutes);
router.use('/api/integrations', validateUser, integrationRoutes);
router.use('/api/userintegrations', validateUser, userIntegrationRoutes);

router.use(authRoutes);

module.exports = router;