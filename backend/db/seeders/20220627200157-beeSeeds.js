'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bees', [
      {
        name: 'Bumblebee',
        address: 'Chimney Rock Trail',
        city: 'Inverness',
        state: 'California',
        country: 'USA',
        price: 24.99,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Bombus_flavifrons.jpg',
        userId: 2
      },
      {
        name: 'Black Dwarf Honey Bee',
        address: 'A, 202 Moo 9, T, Mae Win, Mae Wang District',
        city: 'Chiang Mai',
        state: 'Chiang Mai',
        country: 'Thailand',
        price: 124.36,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Apis_andreniformis_%28side_view%29_BNHM%28E%29013384181_%28cropped_version%29.jpg',
        userId: 2
      },
      {
        name: 'Green Carpenter Bee',
        address: '4068 Playford Hwy',
        city: 'Duncan',
        state: 'South Australia',
        country: 'Australia',
        price: 56.36,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Xylocopa_aeratus.jpg/220px-Xylocopa_aeratus.jpg',
        userId: 3
      },
      {
        name: 'Japanese Giant Hornet',
        address: '1-41 Miyamachi',
        city: 'Nakafurano',
        state: 'Hokkaido',
        country: 'Japan',
        price: 46.24,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/20200512-P1100071_Vespa_mandarinia_japonica.jpg/220px-20200512-P1100071_Vespa_mandarinia_japonica.jpg',
        userId: 4
      },
      {
        name: 'Ligurian (Italian) Bee',
        address: 'Natural Area Parco delle Mura',
        city: 'Genoa',
        state: 'Liguria',
        country: 'Italy',
        price: 35.55,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Bombus_flavifrons.jpg',
        userId: 5
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
