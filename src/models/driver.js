'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.hasMany(models.Participation);
      Driver.hasMany(models.Lap);
      Driver.belongsToMany(models.Race, { through: models.Lap, uniqueKey: 'DriverId' });
    }
  };
  Driver.init({
    _id: {
      type: DataTypes.STRING,
      unique: true
    },
    picture: DataTypes.STRING,
    age: DataTypes.INTEGER,
    name: DataTypes.STRING,
    team: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Driver',
    timestamps: false
  });
  return Driver;
};