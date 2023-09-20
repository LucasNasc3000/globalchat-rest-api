/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fotos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: 1,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      aluno_id: { // Este campo faz com que esta tabela se torne uma tabela filha da tabela alunos.
        type: Sequelize.INTEGER, // este campo é uma chave estrangeira para a tabela alunos
        allowNull: true,
        references: {
          model: 'alunos',
          key: 'id',
        },
        onDelete: 'CASCADE', // caso o id de um aluno seja deletado, todos os dados na linha deste aluno nesta tabela serão apagados também
        onUpdate: 'CASCADE', // caso o id de um aluno seja alterado, o id do aluno também será alterado aqui
      },
      created_at: { // se não tiver dá erro
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: { // se não tiver dá erro
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('fotos');
  },
};
