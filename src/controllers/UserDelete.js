import User from '../models/User';

export class UserDeleteController {
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        res.status(400).json({
          errors: ['O user não existe'],
        });
      }

      await user.destroy();
      return res.json(`usuário ${user.id} deletado`);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserDeleteController();
