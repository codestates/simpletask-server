'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      name: 'tester1',
      email: 'test@test.com',
      password: '1234',
      nickname: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('users', [{
      name: 'tester2',
      email: 'test@test.com',
      password: '1234',
      nickname: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('users', [{
      name: 'tester3',
      email: 'test@test.com',
      password: '1234',
      nickname: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('friendlists', [{
      name: 'testers',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('user_friends', [{
      userId: '3',
      friendId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }])

    await queryInterface.bulkInsert('user_friends', [{
      userId: '2',
      friendId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }])

    await queryInterface.bulkInsert('contents', [{
      title: 'test',
      text: 'test',
      user_id: 'tester1',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('friendlists', null, {})
  }
};
