/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'texts',
      'msghour',
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
  },

  down: () => {},
};
