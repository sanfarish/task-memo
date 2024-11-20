'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('todos', [
      {
        todo: 'Run 10KM on friday 13th',
        finished: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        todo: 'Held a meeting with team at the first day of the month',
        finished: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        todo: 'Record a new YouTube video at the end of the month',
        finished: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('todos', null, {});
  }
};
