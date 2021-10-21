'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Laps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DriverId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Drivers',
            key: 'id',
            as: 'drivers'
        },
        onUpdate: 'cascade'
      },
      RaceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Races',
          key: 'id',
          as: 'races'
        },
        onUpdate: 'cascade'
      },
      time: { 
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Laps');
  }
};