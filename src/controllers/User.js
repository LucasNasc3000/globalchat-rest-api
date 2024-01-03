import User from '../models/User';
import Text from '../models/Text';

export class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);

      const { id, nome, email } = novoUser;
      res.json({ id, nome, email });
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'nome', 'email'],
        order: [['id', 'DESC'], [Text, 'id', 'DESC']],
        include: {
          model: Text,
          attributes: ['id', 'textcontent', 'useremail', 'user_id'],
        },
      }); // O attributes lista somente os campos cujos nomes foram passados no array. Por segurança
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['O usuário não existe'],
        });
      }

      const novosDados = await user.update(req.body);
      return res.json(novosDados);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      const userDelete = await User.findByPk(userId);

      if (!userDelete) {
        res.status(400).json({
          errors: ['O usuário não existe'],
        });
      }

      await userDelete.destroy();
      return res.json(`usuário ${userDelete.id} deletado`);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
// A classe UserController já é instanciada na exportação na linha de baixo. Por isso dá para chamar
// só com userController.store na rota
// Pode-se usar req body como parâmetro único no User.create caso se queira colocar os dados a serem
// cadastrados na api pelo insomnia
export default new UserController();
