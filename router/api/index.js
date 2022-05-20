const router = require('express').Router();

router.use('/', require('./plaidRoutes.js'));

module.exports = router;