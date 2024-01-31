/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'users',
      'isbanned',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    );
  },

  down: () => {},
};
