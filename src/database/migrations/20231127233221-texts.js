/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('texts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: 1,
      },
      textcontent: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: { // Este campo faz com que esta tabela se torne uma tabela filha da tabela usuarios.
        type: Sequelize.INTEGER, // este campo é uma chave estrangeira para a tabela usuarios
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE', // caso o id de um usuario seja deletado, todos os dados na linha deste usuario nesta tabela serão apagados também
        onUpdate: 'CASCADE', // caso o id de um usuario seja alterado, o id do usuario também será alterado aqui
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('texts');
  },
};
