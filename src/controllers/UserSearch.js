import User from '../models/User';

export class UserSearchController {
  async searchByEmail(req, res) {
    try {
      const userFind = await User.findAll({
        where: {
          email: req.params.useremail,
        },
        attributes: ['id', 'email', 'nome', 'isbanned'],
      });

      if (!userFind) {
        res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }

      if (userFind === null || userFind === '') return res.json('Usuário não encontrado');

      return res.json(userFind);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async searchByName(req, res) {
    try {
      const userFind = await User.findAll({
        where: {
          nome: req.params.username,
        },
        attributes: ['id', 'email', 'nome', 'isbanned'],
      });

      if (!userFind) {
        res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }

      if (userFind === null || userFind === '') return res.json('Usuário não encontrado');

      return res.json(userFind);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async searchById(req, res) {
    try {
      const { id } = req.params;
      const numberId = Number(id);

      const userFind = await User.findAll({
        where: {
          id: numberId,
        },
        attributes: ['id', 'email', 'nome', 'isbanned'],
      });

      if (!userFind) {
        res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }

      if (userFind === null || userFind === '') return res.json('Usuário não encontrado');

      return res.json(userFind);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserSearchController();
