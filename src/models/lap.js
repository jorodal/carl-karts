'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lap.belongsTo(models.Race);
      Lap.belongsTo(models.Driver);
    }
  };
  Lap.init({
    time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lap',
    timestamps: false
  });
  return Lap;
};