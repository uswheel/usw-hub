const db = require('../../db/models');
const error = require('../../helpers/error.helpers');

module.exports = {

  async getItem(data, res) {
    try {
      const items = await db.Item.findAll({
        where: data,
        order: [
          ['location', 'ASC'],
          ['rack', 'ASC'],
          ['level', 'ASC'],
          ['column', 'ASC'],
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
  },

  async put(data, res) {
    try {
      const item = await this.findItem(data)
        .catch(err => {
          console.error(err);
          throw error(500, 'Item find error');
        })
      await this.createHistory(item, data)
        .catch(err => {
          console.error(err);
          throw error(500, 'History create error');
        })
      const dbRes = await db.Item.update(
        fields,
        { where: { id: data.id } }
      )
        .catch(err => {
          console.error(err);
          throw error(500, 'Item update error.');
        })
      res.json(dbRes);
    }
    catch (err) {
      res.status(err.code).json({ error: err.message });
    }
  },

  async delete(data, res) {
    try {
      const dbRes = await db.Item.destroy({ where: { id: data.id } })
        .catch(err => {
          console.error(err);
          throw error(500, 'Items findAll error.');
        })
      res.json(dbRes);
    }
    catch (err) {
      res.status(err.code).json({ error: err.message });
    }
  },

  getHistory(data, res) {
    db.History.findAll({
      where: data,
      order: [['createdAt', 'DESC']]
    })
      .then(dbRes => res.json(dbRes))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'History findAll error.' });
      })
  },

  createHistory(oldItem, newItem) {
    return new Promise((resolve, reject) => {
      db.History.create({
        partNumber: oldItem.partNumber,
        locationOld: oldItem.location,
        rackOld: oldItem.rack,
        levelOld: oldItem.level,
        columnOld: oldItem.column,
        quantityOld: oldItem.quantity,
        locationNew: newItem.location ? newItem.location : oldItem.location,
        rackNew: newItem.rack ? newItem.rack : oldItem.rack,
        levelNew: newItem.level ? newItem.level : oldItem.level,
        columnNew: newItem.column ? newItem.column : oldItem.column,
        quantityNew: newItem.quantity ? newItem.quantity : oldItem.quantity,
        user: newItem.user
      })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
  },

  findItem(data) {
    return new Promise((resolve, reject) => {
      db.Item.find({
        where: { id: data.id },
        raw: true
      })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
  }
}