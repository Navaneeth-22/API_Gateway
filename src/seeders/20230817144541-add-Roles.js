'use strict';

/** @type {import('sequelize-cli').Migration} */
const {ENUMS} = require("../utils/common")
const {ADMIN,USER,CINEMA_COMPANY} = ENUMS.USER_ROLE
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('Roles', [
        {
          name: ADMIN,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: USER,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name : CINEMA_COMPANY,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('Roles', null, {});
  }
};
