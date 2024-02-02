"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable camelcase */
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Text = require('../models/Text'); var _Text2 = _interopRequireDefault(_Text);

 class UserController {
  async store(req, res) {
    try {
      const newUser = await _User2.default.create(req.body);

      const {
        id, nome, email, created_at,
      } = newUser;
      res.json({
        id, nome, email, created_at,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async usersList(req, res) {
    try {
      const users = await _User2.default.findAll({
        attributes: ['id', 'nome', 'email', 'isbanned'],
        order: [['id', 'DESC'], [_Text2.default, 'id', 'DESC']],
        include: {
          model: _Text2.default,
          attributes: ['id', 'textcontent', 'useremail', 'user_id'],
        },
      }); // O attributes lista somente os campos cujos nomes foram passados no array. Por segurança
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['O usuário não existe'],
        });
      }

      const novosDados = await user.update(req.body);
      return res.json(novosDados);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async search(req, res) {
    const { searchValue } = req.params;
    let userFind = '';
    try {
      switch (searchValue) {
        case (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/):
          userFind = await _User2.default.findOne({
            where: {
              email: searchValue,
            },
          });
          break;
        case (/^[0-9]+$/):
          userFind = await _User2.default.findOne({
            where: {
              id: searchValue,
            },
          });
          break;
        default:
          userFind = await _User2.default.findOne({
            where: {
              nome: searchValue,
            },
          });
      }

      if (!userFind) {
        res.status(400).json({
          errors: ['O usuário não existe'],
        });
      }

      const {
        id, email, nome, isbanned,
      } = userFind;

      return res.json({
        id, email, nome, isbanned,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async banUser(req, res) {
    try {
      const { isbanned } = req.body;

      const userFind = await _User2.default.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ['id', 'email', 'nome', 'isbanned'],
      });

      if (!userFind) {
        res.status(400).json({
          errors: ['O usuário não existe'],
        });
      }

      await userFind.update({ isbanned });

      return res.json(userFind);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
} exports.UserController = UserController;
// A classe UserController já é instanciada na exportação na linha de baixo. Por isso dá para chamar
// só com userController.store na rota
// Pode-se usar req body como parâmetro único no User.create caso se queira colocar os dados a serem
// cadastrados na api pelo insomnia
exports. default = new UserController();
