import User from '../models/User';
import Text from '../models/Text';

export class UserController {
  async store(req, res) {
    try {
      const { nome, email, password } = req.body;
      const novoUser = await User.create(nome, email, password);

      res.json(novoUser);
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async usersList(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'nome', 'email', 'isbanned'],
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
      const user = await User.findByPk(req.params.id);

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

  async search(req, res) {
    try {
      const userFind = await User.findOne({
        where: {
          email: req.params.useremail,
        },
      });

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

  async userBan(req, res) {
    const { isBanned } = req.body;

    const userFind = await User.findOne({
      where: {
        email: req.params.useremail,
      },
      attributes: ['id', 'email', 'nome', 'isbanned'],
    });

    if (!userFind) {
      res.status(400).json({
        errors: ['O usuário não existe'],
      });
    }

    await userFind.update({ isbanned: isBanned });

    return res.json(userFind);
  }
}
// A classe UserController já é instanciada na exportação na linha de baixo. Por isso dá para chamar
// só com userController.store na rota
// Pode-se usar req body como parâmetro único no User.create caso se queira colocar os dados a serem
// cadastrados na api pelo insomnia
export default new UserController();
