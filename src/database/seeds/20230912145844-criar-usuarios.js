const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          nome: 'MarcosSilva',
          email: 'mms1010@mail.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          nome: 'MarcosSilva2',
          email: 'mms1011@mail.com',
          password_hash: await bcryptjs.hash('1234567', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          nome: 'MarcosSilva3',
          email: 'mms1012@mail.com',
          password_hash: await bcryptjs.hash('12345678', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: () => {},
};
