"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable no-multi-spaces */
/* eslint-disable camelcase */
var _Text = require('../models/Text'); var _Text2 = _interopRequireDefault(_Text);

class TextController {
  // Cria novas mensagens na base de dados com o que o usuário envia no front-end, que vem para este
  // método através do req.body
  // eslint-disable-next-line max-len
  // Depois todos os dados relativos à mensagem são exibidos (neste caso em aplicativos de design de API, não na aplicação)
  async store(req, res) {
    try {
      const newTxt = await _Text2.default.create(req.body);

      const {
        id, textcontent, useremail,  user_id, msghour,
      } = newTxt;
      res.json({
        id, textcontent, useremail, user_id, msghour,
      });
    } catch (e) {
      if (res.status !== 200) {
        res.json({
          errors: e.errors.map((err) => err.message),
        });
      }
    }
  }

  // lista todas as mensagens e os dados relativos às mesmas para o front-end e mostra também os
  // dados em json para aplicativos de design de API, como o insomnia, usado neste projeto.
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

  // Obtêm o id de uma mensagem da url e procura pela mesma na base de dados usando
  // este id e em seguida, se a mensagem existir ela é deletada.
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

  // Este método é utilizado para apagar todas as mensagens na base de dados
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
