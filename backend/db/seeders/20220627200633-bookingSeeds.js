'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        beeId: 1,
        userId: 1,
        startDate: '2022-09-22',
        endDate: '2022-09-24'
      },
      {
        beeId: 2,
        userId: 1,
        startDate: '2022-10-22',
        endDate: '2022-10-24'
      },
      {
        beeId: 3,
        userId: 1,
        startDate: '2022-11-22',
        endDate: '2022-11-24'
      },
      {
        beeId: 4,
        userId: 1,
        startDate: '2022-12-22',
        endDate: '2022-12-24'
      },
      {
        beeId: 5,
        userId: 1,
        startDate: '2023-01-22',
        endDate: '2023-01-24'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
