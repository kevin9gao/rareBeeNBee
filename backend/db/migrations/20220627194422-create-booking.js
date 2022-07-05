'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      beeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Bees' }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      beeName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      totalPrice: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bookings');
  }
};
