const express = require('express');
const auth = require('./auth.routes');

const router = express.Router();

router.use('/auth', auth);

module.exports = router;