import User from '../models/User';

export class UserSearchController {
  async search(req, res) {
    const { searchValue } = req.params;
    const numberId = Number(searchValue);
    let userFind = '';

    try {
      if (searchValue.match(/^[A-Z]+$/i)) {
        userFind = await User.findOne({
          where: {
            nome: searchValue,
          },
        });
      } if (searchValue.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        userFind = await User.findOne({
          where: {
            email: searchValue,
          },
        });
      }
      if (searchValue.match(/^[0-9]+$/)) {
        userFind = await User.findOne({
          where: {
            id: numberId,
          },
        });
      }

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
}

export default new UserSearchController();
