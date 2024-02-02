import User from '../models/User';

export class UserSearchController {
  async searchByEmail(req, res) {
    try {
      const userFind = await User.findAll({
        where: {
          email: req.params.useremail,
        },
      });

      if (!userFind) {
        res.status(400).json({
          errors: ['Usuário não encontrado'],
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

  async searchByName(req, res) {
    try {
      const userFind = await User.findAll({
        where: {
          nome: req.params.username,
        },
      });

      if (!userFind) {
        res.status(400).json({
          errors: ['Usuário não encontrado'],
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

  async searchById(req, res) {
    try {
      const { id } = req.params;
      const numberId = Number(id);

      const userFind = await User.findAll({
        where: {
          id: numberId,
        },
      });

      if (!userFind) {
        res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }

      const {
        email, nome, isbanned,
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
}

export default new UserSearchController();
