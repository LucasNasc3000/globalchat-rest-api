// eslint-disable-next-line import/no-extraneous-dependencies
import Sequelize, { Model } from 'sequelize';

export default class Text extends Model {
  static init(sequelize) {
    super.init({
      textcontent: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [1, 1000],
            msg: 'Mensagens não podem ultrapassar os 1000 caracteres',
          },
        },
      },
      useremail: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 255],
            msg: 'O campo email deve ter entre 6 e 255 caracteres',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
