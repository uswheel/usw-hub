const express = require('express');
const sequelize = require('sequelize');
const tasks = require('../../db/tasks');
const models = require('../../db/models');

const router = express.Router();

router.get('/item', (req, res) => {
  const data = req.query;
  const order = [
    ['location', 'ASC'],
    ['row', 'ASC'],
    ['column', 'ASC'],
    ['partNumber', 'ASC']
  ]
  if (data.partNumber) data.partNumber = sequelize.where(sequelize.fn('LOWER', sequelize.col('partNumber')), 'LIKE', '%' + data.partNumber.toLowerCase() + '%');
  tasks.get(models.Item, data, order)
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.status(500).json('Items find error.')
    });
});

router.put('/item', (req, res) => helpers.put(req.body, res));
router.delete('/item', (req, res) => helpers.delete(req.query, res));

router.get('/history', (req, res) => {
  const data = req.params;
  const order = [['createdAt', 'DESC']];
  tasks.get(models.History, data, order)
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.status(500).json('History find error.');
    })
})

module.exports = router;