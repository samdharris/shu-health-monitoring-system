const { Router } = require('express');

const userRoutes = require('./user.routes');
const router = Router();

router.use('/api/users', userRoutes);

module.exports = router;
