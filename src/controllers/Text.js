/* eslint-disable no-multi-spaces */
/* eslint-disable camelcase */
import Text from '../models/Text';

class TextController {
  async store(req, res) {
    try {
      const newTxt = await Text.create(req.body);

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
      const message = await Text.findAll({
        attributes: ['id', 'msghour', 'created_at', 'useremail', 'textcontent'],
      }); // O attributes lista somente os campos cujos nomes foram passados no array. Por segurança
      return res.json(message);
    } catch (e) {
      return res.json(null);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const deleteMessage = await Text.findByPk(id);

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
}

export default new TextController();
