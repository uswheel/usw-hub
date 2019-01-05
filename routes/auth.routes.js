const express = require('express');
const User = require('../db/models').User;
const error = require('../helpers/error.helpers');
const token = require('../helpers/token.helpers');

const router = express.Router();

router.get('/login', (req, res) => {
  login(req.query);
  async function login(data) {
    const email = data.email;
    const password = data.password
    try {
      const userData = await User.findOne({ where: { email: email } })
        .catch(err => {
          console.error(err);
          throw error(500, 'User findOne error.');
        })
      if (userData === null) throw error(500, 'User does not exist.');
      if (userData.dataValues.password === password) {
        const tokenData = { ...userData.dataValues };
        delete tokenData.password;
        const jwt = await token.create(tokenData)
          .catch(err => {
            console.error(err);
            throw error(500, 'JWT generation error.');
          })
        res.json({ token: jwt });
      } else {
        throw error(500, 'Wrong password.');
      }
    }
    catch (err) {
      res.status(err.code).json({ error: err.message });
    }
  }
})

module.exports = router;