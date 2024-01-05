"use strict";/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'users',
      'isbanned',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    );
  },

  down: () => {},
};
