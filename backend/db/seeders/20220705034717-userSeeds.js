'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://static.wikia.nocookie.net/bb6b9a39-8699-4ab7-9f8d-3109ac9cc0b0/scale-to-width/755'
      },
      {
        email: 'beecatcher1@bees.net',
        username: 'Beecatcher1',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://static.wikia.nocookie.net/bb6b9a39-8699-4ab7-9f8d-3109ac9cc0b0/scale-to-width/755'
      },
      {
        email: 'beecatcher2@bees.net',
        username: 'Beecatcher2',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://static.wikia.nocookie.net/bb6b9a39-8699-4ab7-9f8d-3109ac9cc0b0/scale-to-width/755'
      },
      {
        email: 'beecatcher3@bees.net',
        username: 'Beecatcher3',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://static.wikia.nocookie.net/bb6b9a39-8699-4ab7-9f8d-3109ac9cc0b0/scale-to-width/755'
      },
      {
        email: 'beecatcher4@bees.net',
        username: 'Beecatcher4',
        hashedPassword: bcrypt.hashSync('password2'),
        profilePicUrl: 'https://static.wikia.nocookie.net/bb6b9a39-8699-4ab7-9f8d-3109ac9cc0b0/scale-to-width/755'
      },
      {
        email: 'beecatcher5@bees.net',
        username: 'Beecatcher5',
        hashedPassword: bcrypt.hashSync('password3'),
        profilePicUrl: 'https://static.wikia.nocookie.net/bb6b9a39-8699-4ab7-9f8d-3109ac9cc0b0/scale-to-width/755'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition',
                            'Beecatcher1',
                            'Beecatcher2',
                            'Beecatcher3',
                            'Beecatcher4',
                            'Beecatcher5',] }
    }, {});
  }
};
