const { Router } = require('express');
const router = Router();
const controller = require('../controllers/login.controller');

router.post('/login', controller.login);

router.post('/verify', controller.verify);

module.exports = router;
