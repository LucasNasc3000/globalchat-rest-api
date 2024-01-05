"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// eslint-disable-next-line import/no-extraneous-dependencies
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
// eslint-disable-next-line import/no-extraneous-dependencies
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existente',
        },
        validate: {
          isEmail: {
            args: [3, 255],
            msg: 'Email inválido',
          },
        },
      },
      password_hash: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 60],
            msg: 'A senha precisa ter entre 8 e 60 caracteres',
          },
        },
      },
      isbanned: {
        type: _sequelize2.default.BOOLEAN,
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  PasswordValidator(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Text, { foreignKey: 'user_id' });
  }

  /* static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  } */
} exports.default = User;

// O tipo virtual faz com que um campo seja considerado apenas virtualmente, ele não vai para o BD
