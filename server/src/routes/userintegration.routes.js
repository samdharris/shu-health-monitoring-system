const { Router } = require('express');
const userIntegrationController = require('../controllers/userintegration.controller');
const router = Router();

router.get('/:userIntegrationId', userIntegrationController.getIntegrationData);

module.exports = router;
