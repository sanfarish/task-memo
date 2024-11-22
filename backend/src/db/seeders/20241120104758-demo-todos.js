'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('todos', [
      {
        task: 'Run 10KM on friday 13th',
        done: false,
        created_at: new Date("2024-09-12T08:00:00"),
        updated_at: new Date("2024-09-12T08:00:00"),
      },
      {
        task: 'Held a meeting with team at the first day of the month',
        done: true,
        created_at: new Date("2024-10-10T10:12:34"),
        updated_at: new Date("2024-10-10T10:12:34"),
      },
      {
        task: 'Record a new YouTube video at the end of the month',
        done: false,
        created_at: new Date("2024-11-09T13:56:09"),
        updated_at: new Date("2024-11-09T13:56:09"),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('todos', null, {});
  }
};
