'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Participations', {
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
            key: 'id'
        },
        onUpdate: 'cascade'
      },
      RaceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Races',
          key: 'id'
        },
        onUpdate: 'cascade'
      },
      position: {
        type: Sequelize.INTEGER
      },
      points: {
        type: Sequelize.INTEGER
      },
      best_lap: {
        type: Sequelize.STRING
      },
      total_time: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Participations');
  }
};