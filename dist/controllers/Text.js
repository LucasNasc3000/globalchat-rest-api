"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable no-multi-spaces */
/* eslint-disable camelcase */
var _Text = require('../models/Text'); var _Text2 = _interopRequireDefault(_Text);

class TextController {
  async store(req, res) {
    try {
      const newTxt = await _Text2.default.create(req.body);

      const {
        id, textcontent, useremail,  user_id, msghour,
      } = newTxt;
      res.json({
        id, textcontent, useremail, user_id, msghour,
      });
      console.log(newTxt);
    } catch (e) {
      if (res.status !== 200) {
        res.json({
          errors: e.errors.map((err) => err.message),
        });
      }
    }
  }

  async index(req, res) {
    try {
      const message = await _Text2.default.findAll({
        attributes: ['id', 'msghour', 'created_at', 'useremail', 'textcontent'],
        order: [['id', 'DESC']],
      });
      return res.json(message);
    } catch (e) {
      return res.json(null);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const deleteMessage = await _Text2.default.findByPk(id);

      if (!deleteMessage) {
        return res.status(400).json({
          errors: ['Esta mensagem não existe'],
        });
      }

      await deleteMessage.destroy();

      return res.json(`Mensagem ${id} deletada`);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async deleteAll(req, res) {
    try {
      await _Text2.default.truncate();
      return res.json('Todas as mensagens foram apagadas');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new TextController();
