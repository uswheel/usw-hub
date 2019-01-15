const express = require('express');
const auth = require('./auth.routes');
const db = require('./db.routes/db.routes');
const verifyJwt = require('../helpers/token.helpers').verify;

const router = express.Router();

router.use('/auth', auth);

//protected routes
router.use('/db', verifyJwt, db);

module.exports = router;