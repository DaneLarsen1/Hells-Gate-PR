const router = require('express').Router();
const userRoutes = require('./userRoutes');
const liftRoutes = require('./liftRoutes');

router.use('/user', userRoutes);
router.use('/lift', liftRoutes);

module.exports = router;