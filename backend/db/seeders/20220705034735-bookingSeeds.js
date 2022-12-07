'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        beeId: 1,
        userId: 1,
        startDate: '2022-09-22',
        endDate: '2022-09-24',
        beeName: 'Bumblebee',
        location: 'Chimney Rock Trail, Inverness, California, USA',
        price: 24.99,
        totalPrice: 149.98
      },
      {
        beeId: 2,
        userId: 1,
        startDate: '2022-10-22',
        endDate: '2022-10-24',
        beeName: 'Black Dwarf Honey Bee',
        location: 'A, 202 Moo 9, T, Mae Win, Mae Wang District, Chiang Mai, Chiang Mai, Thailand',
        price: 124.36,
        totalPrice: 273.59
      },
      {
        beeId: 3,
        userId: 1,
        startDate: '2022-11-22',
        endDate: '2022-11-24',
        beeName: 'Green Carpenter Bee',
        location: '4068 Playford Hwy, Duncan, South Australia, Australia',
        price: 56.36,
        totalPrice: 212.72
      },
      {
        beeId: 4,
        userId: 1,
        startDate: '2022-12-22',
        endDate: '2022-12-24',
        beeName: 'Japanese Giant Hornet',
        location: '1-41 Miyamachi, Nakafurano, Hokkaido, Japan',
        price: 46.24,
        totalPrice: 192.48
      },
      {
        beeId: 5,
        userId: 1,
        startDate: '2023-01-22',
        endDate: '2023-01-24',
        beeName: 'Ligurian (Italian) Bee',
        location: 'Natural Area Parco delle Mura, Genoa, Liguria, Italy',
        price: 35.55,
        totalPrice: 171.10
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
