'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      name: 'tester',
      email: 'test@test.com',
      password: '1234',
      nickname: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('friendlists', [{
      name: 'testers'
    }]);

    await queryInterface.bulkInsert('user_friends', [{
      userId: '3',
      friendId: '1'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('friendlists', null, {})
  }
};
