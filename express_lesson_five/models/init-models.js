var DataTypes = require("sequelize").DataTypes;
var _actor = require("./actor");

function initModels(sequelize) {
  var actor = _actor(sequelize, DataTypes);


  return {
    actor,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
