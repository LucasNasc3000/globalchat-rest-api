"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable camelcase */
var _Text = require('../models/Text'); var _Text2 = _interopRequireDefault(_Text);

class TextController {
  async store(req, res) {
    try {
      const newTxt = await _Text2.default.create(req.body);

      const { id, textcontent, user_id } = newTxt;
      res.json({ id, textcontent, user_id });
      console.log(newTxt);
    } catch (e) {
      if (res.status !== 200) {
        res.json({
          errors: e.errors.map((err) => err.message),
        });
      }
    }
  }
}

exports. default = new TextController();