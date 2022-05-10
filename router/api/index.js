const router = require('express').Router();

router.use('/plaid', require('./plaidRoutes.js'));

module.exports = router;