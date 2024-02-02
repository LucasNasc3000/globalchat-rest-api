"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

 class UserSearchController {
  async searchByEmail(req, res) {
    try {
      const userFind = await _User2.default.findAll({
        where: {
          email: req.params.useremail,
        },
        attributes: ['id', 'email', 'nome', 'isbanned'],
      });

      if (!userFind) {
        res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }

      return res.json(userFind);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async searchByName(req, res) {
    try {
      const userFind = await _User2.default.findAll({
        where: {
          nome: req.params.username,
        },
        attributes: ['id', 'email', 'nome', 'isbanned'],
      });

      if (!userFind) {
        res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }

      return res.json(userFind);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async searchById(req, res) {
    try {
      const { id } = req.params;
      const numberId = Number(id);

      const userFind = await _User2.default.findAll({
        where: {
          id: numberId,
        },
        attributes: ['id', 'email', 'nome', 'isbanned'],
      });

      if (!userFind) {
        res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }

      return res.json(userFind);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
} exports.UserSearchController = UserSearchController;

exports. default = new UserSearchController();
