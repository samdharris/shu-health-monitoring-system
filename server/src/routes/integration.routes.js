const { Router } = require('express');
const router = Router();
const controller = require('../controllers/data.controller');

router.put('/:integrationId/data', controller.updateData);
router.post('/:integrationId/data', controller.addData);
router.get('/', controller.viewData);

module.exports = router;
