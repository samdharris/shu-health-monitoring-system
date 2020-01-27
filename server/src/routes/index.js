const { Router } = require('express');

const userRoutes = require('./user.routes');
const router = Router();
const dummyRoutes = require('./dummy.routes');
router.use('/api/users', userRoutes);
router.use(dummyRoutes);

module.exports = router;
