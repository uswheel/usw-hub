const express = require('express');
const db = require('../db/models');
const error = require('../helpers/error.helpers');

const router = express.Router();

router.get('/items', (req, res) => {
  const query = req.query;
  getItems();
  async function getItems() {
    try {
      const items = await db.Item.findAll({
        where: query,
        order: [
          ['location', 'ASC'],
          ['rack', 'ASC'],
          ['partNumber', 'ASC']
        ]
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