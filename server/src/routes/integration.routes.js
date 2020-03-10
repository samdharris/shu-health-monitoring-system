const { Router } = require('express');
const router = Router();
const controller = require('../controllers/data.controller');

router.put('/:integrationId/data', controller.updateData);
router.get('/', controller.viewData);

module.exports = router;
