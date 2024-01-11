"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// eslint-disable-next-line import/no-extraneous-dependencies
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Text extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      textcontent: {
        type: _sequelize2.default.STRING,
        validate: {
          len: {
            args: [1, 1000],
            msg: 'Mensagens não podem ultrapassar os 1000 caracteres',
          },
        },
      },
      useremail: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 255],
            msg: 'O campo email deve ter entre 6 e 255 caracteres',
          },
        },
      },
      user_id: {
        type: _sequelize2.default.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'user_id precisa ser um número inteiro',
          },
        },
      },
      msghour: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
} exports.default = Text;
