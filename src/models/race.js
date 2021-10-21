'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Race extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Race.hasMany(models.Participation);
      Race.hasMany(models.Lap);
      Race.belongsToMany(models.Driver, { through: models.Lap, uniqueKey: 'RaceId'});
    }
  };
  Race.init({
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Race',
    timestamps: false
  });
  return Race;
};