const express = require('express');
const User = require('../db/models/user.model');

const router = express.Router();

router.get('/login', (req, res) => {
  login(req.query);
  async function login(data) {
    const email = data.email;
    const password = data.password
    try {
      console.log('hello');
    }
    catch (err) {

    }
  }
})

module.exports = router;