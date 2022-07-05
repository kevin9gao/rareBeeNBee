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
        userId: 2,
        description: 'Your standard run-of-the-mill bumblebee.',
        details: 'The bumblebee is a very important specimen that allows many types of plant life to exist in the world. If it were not for this bee, the plants we know and love around the world would not be alive today.'
      },
      {
        name: 'Black Dwarf Honey Bee',
        address: 'A, 202 Moo 9, T, Mae Win, Mae Wang District',
        city: 'Chiang Mai',
        state: 'Chiang Mai',
        country: 'Thailand',
        price: 124.36,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Apis_andreniformis_%28side_view%29_BNHM%28E%29013384181_%28cropped_version%29.jpg',
        userId: 2,
        description: 'A special black dwarf honey bee',
        details: 'The honey bee is a very important specimen that allows many types of plant life to exist in the world. If it were not for this bee, the plants we know and love around the world would not be alive today. This variety of honey bee is especially cute!'
      },
      {
        name: 'Green Carpenter Bee',
        address: '4068 Playford Hwy',
        city: 'Duncan',
        state: 'South Australia',
        country: 'Australia',
        price: 56.36,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Xylocopa_aeratus.jpg/220px-Xylocopa_aeratus.jpg',
        userId: 3,
        description: 'Pretty cool bee',
        details: 'I believe this bee makes furniture, or something? I dunno but it\'s pretty darn cool mate.'
      },
      {
        name: 'Japanese Giant Hornet',
        address: '1-41 Miyamachi',
        city: 'Nakafurano',
        state: 'Hokkaido',
        country: 'Japan',
        price: 46.24,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/20200512-P1100071_Vespa_mandarinia_japonica.jpg/220px-20200512-P1100071_Vespa_mandarinia_japonica.jpg',
        userId: 4,
        description: 'これは私が散歩で見つけたかなりクールな蜂です。',
        details: '危険かもしれませんので、見つけたら距離を保ってください。しかし、それはキャッチする価値があるかもしれません！ \n English: (it might be dangerous, so keep your distance if you find it. it might be worth catching, though!)'
      },
      {
        name: 'Ligurian (Italian) Bee',
        address: 'Natural Area Parco delle Mura',
        city: 'Genoa',
        state: 'Liguria',
        country: 'Italy',
        price: 35.55,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Honeybee-27527-1.jpg/1200px-Honeybee-27527-1.jpg',
        userId: 5,
        description: 'ape speciale',
        details: 'vieni a visitare Genova e cattura api rare come questa! \n English: (come visit Genoa and catch rare bees such as this one!)'
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
