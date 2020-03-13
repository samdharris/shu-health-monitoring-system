const { Router } = require('express');
const controller = require('../controllers/user.controller');

const router = Router();

router.get('/', controller.index);
router.get('/:userId', controller.getUser);

module.exports = router;
