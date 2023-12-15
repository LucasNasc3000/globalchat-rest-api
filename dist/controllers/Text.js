"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable no-multi-spaces */
/* eslint-disable camelcase */
var _Text = require('../models/Text'); var _Text2 = _interopRequireDefault(_Text);

class TextController {
  async store(req, res) {
    try {
      const newTxt = await _Text2.default.create(req.body);

      const {
        id, textcontent, useremail,  user_id,
      } = newTxt;
      res.json({
        id, textcontent, useremail, user_id,
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
      const message = await _Text2.default.findAll({ attributes: ['textcontent', 'useremail'],  order: [['id', 'DESC']] }); // O attributes lista somente os campos cujos nomes foram passados no array. Por segurança
      return res.json(message);
    } catch (e) {
      return res.json(null);
    }
  }
}

exports. default = new TextController();
