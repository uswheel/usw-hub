const express = require('express');
const db = require('../db/models');
const error = require('../helpers/error.helpers');

const router = express.Router();

router.get('/items', (req, res) => {
  const query = req.body;
  console.log(req.body);
  getItems();
  async function getItems() {
    try {
      const items = await db.Item.findAll({
      })
        .catch(err => {
          console.error(err);
          throw error(500, 'Items findAll error.');
        })
      res.json(items);
    }
    catch (err) {
      res.status(err.code).json({ error: err.message });
    }
  }
})

module.exports = router;