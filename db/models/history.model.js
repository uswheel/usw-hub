const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
  const History = sequelize.define('History', {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    partNumber: type.STRING,
    location: type.STRING,
    row: type.INTEGER.UNSIGNED,
    column: type.INTEGER.UNSIGNED,
    change: type.INTEGER,
    user: type.STRING
  })
  return History;
}