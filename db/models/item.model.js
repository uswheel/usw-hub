const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
  const Item = sequelize.define('Item', {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    partNumber: type.STRING,
    location: type.STRING,
    rack: type.INTEGER,
    level: type.INTEGER,
    column: type.INTEGER,
    quantity: type.INTEGER.UNSIGNED
  })
  return Item;
}