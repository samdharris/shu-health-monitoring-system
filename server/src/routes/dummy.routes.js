const { Router } = require('express');
const router = Router();
const controller = require('../controllers/dummy.controller');

router.get('/foo', controller.testeroni)

module.exports = router;