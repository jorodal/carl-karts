'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participation.belongsTo(models.Driver);
      Participation.belongsTo(models.Race);
    }
  };
  Participation.init({
    position: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    best_lap: DataTypes.STRING,
    total_time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Participation',
    timestamps: false
  });
  return Participation;
};