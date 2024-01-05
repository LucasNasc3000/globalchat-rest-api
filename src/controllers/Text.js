/* eslint-disable no-multi-spaces */
/* eslint-disable camelcase */
import Text from '../models/Text';

class TextController {
  async store(req, res) {
    try {
      const newTxt = await Text.create(req.body);

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
      const message = await Text.findAll({ attributes: ['textcontent', 'useremail', 'created_at'],  order: [['id', 'DESC'], ['textcontent', 'DESC'], ['useremail', 'DESC']] }); // O attributes lista somente os campos cujos nomes foram passados no array. Por segurança
      return res.json(message);
    } catch (e) {
      return res.json(null);
    }
  }
}

export default new TextController();
