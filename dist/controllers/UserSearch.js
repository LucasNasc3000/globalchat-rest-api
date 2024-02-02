"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

 class UserSearchController {
  async search(req, res) {
    const { searchValue } = req.params;
    const numberId = Number(searchValue);
    const idParam = /^[0-9]+$/;
    const emailParam = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let userFind = '';

    try {
      switch (searchValue) {
        case (searchValue === emailParam):
          userFind = await _User2.default.findOne({
            where: {
              email: searchValue,
            },
          });
          break;
        case (searchValue === idParam):
          userFind = await _User2.default.findOne({
            where: {
              id: numberId,
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
} exports.UserSearchController = UserSearchController;

exports. default = new UserSearchController();
