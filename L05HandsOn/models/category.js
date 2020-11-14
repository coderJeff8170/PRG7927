/* jshint indent: 2 */

const { DECIMAL } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    default_price: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 5.00
    }
  }, {
    tableName: 'category'
  });
};
