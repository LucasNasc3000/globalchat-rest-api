/* eslint-disable camelcase */
import Text from '../models/Text';

class TextController {
  async store(req, res) {
    try {
      const newTxt = await Text.create(req.body);

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

  async index(req, res) {
    try {
      const message = await Text.findAll({ attributes: ['textcontent', 'useremail'] }); // O attributes lista somente os campos cujos nomes foram passados no array. Por segurança
      return res.json(message);
    } catch (e) {
      return res.json(null);
    }
  }
}

export default new TextController();
