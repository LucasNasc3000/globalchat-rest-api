import User from '../models/User';

export class UserSearchController {
  async search(req, res) {
    const { searchValue } = req.params;
    const numberId = Number(searchValue);
    const idParam = /^[0-9]+$/;
    const emailParam = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let userFind = '';

    try {
      switch (searchValue) {
        case (searchValue === emailParam):
          userFind = await User.findOne({
            where: {
              email: searchValue,
            },
          });
          break;
        case (searchValue === idParam):
          userFind = await User.findOne({
            where: {
              id: numberId,
            },
          });
          break;
        case (/^\d+g/):
          userFind = await User.findOne({
            where: {
              nome: searchValue,
            },
          });
          break;
        default:
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
