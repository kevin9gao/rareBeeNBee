'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'beecatcher1@bees.net',
        username: 'Beecatcher1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'beecatcher2@bees.net',
        username: 'Beecatcher2',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'beecatcher3@bees.net',
        username: 'Beecatcher3',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'beecatcher4@bees.net',
        username: 'Beecatcher4',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'beecatcher5@bees.net',
        username: 'Beecatcher5',
        hashedPassword: bcrypt.hashSync('password3')
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
