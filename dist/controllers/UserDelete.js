"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

 class UserDeleteController {
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      const user = await _User2.default.findByPk(id);

      if (!user) {
        res.status(400).json({
          errors: ['O user não existe'],
        });
      }

      await user.destroy();
      return res.json(`usuário ${user.id} deletado`);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
} exports.UserDeleteController = UserDeleteController;

exports. default = new UserDeleteController();
