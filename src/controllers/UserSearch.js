import User from '../models/User';

export class UserSearchController {
  async search(req, res) {
    const { searchValue } = req.params;
    const numberId = Number(searchValue);
    let userFind = '';

    try {
      if (searchValue.contains('@')) {
        userFind = await User.findAll({
          where: {
            email: searchValue,
          },
        });
      } if (searchValue === String) {
        userFind = await User.findAll({
          where: {
            nome: searchValue,
          },
        });
      }
      if (searchValue.match(/^[0-9]+$/)) {
        userFind = await User.findAll({
          where: {
            id: numberId,
          },
        });
      }

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
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserSearchController();
