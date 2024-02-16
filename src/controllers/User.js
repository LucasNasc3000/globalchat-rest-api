/* eslint-disable camelcase */
import User from '../models/User';
import Text from '../models/Text';

export class UserController {
  // Cria novos usuários na base de dados com os dados enviados pelo front-end, que vem para este
  // método através do req.body
  // eslint-disable-next-line max-len
  // Depois todos os dados relativos à mensagem são exibidos (neste caso em aplicativos de design de API, não na aplicação)
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);

      const {
        id, nome, email, created_at,
      } = newUser;
      res.json({
        id, nome, email, created_at,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // lista todos os usuários e os dados relativos a eles para o front-end e mostra também os
  // dados em json para aplicativos de design de API, como o insomnia, usado neste projeto.
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

  // Busca um usuário na base de dados de acordo com o id, que este método obtêm da url e se este
  // usuário existir seus dados serão atualizados de acordo com os dados que vierem do front-end
  // através do req.body
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

  // Altera o campo isbanned, false por padrão, para true de um usuário, que é especificado de
  // acordo com a busca feita na base de dados com base no id na url.
  // No front-end o acesso do usuário à página será bloqueado.
  async banUser(req, res) {
    try {
      const { isbanned } = req.body;

      const userFind = await User.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ['id', 'email', 'nome', 'isbanned'],
      });

      if (!userFind) {
        res.status(400).json({
          errors: ['O usuário não existe'],
        });
      }

      await userFind.update({ isbanned });

      return res.json(userFind);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Deleta um usuário específico de acordo com o id que virá da url
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
// A classe UserController já é instanciada na exportação na linha de baixo. Por isso dá para chamar
// só com userController.store na rota
// Pode-se usar req body como parâmetro único no User.create caso se queira colocar os dados a serem
// cadastrados na api pelo insomnia
export default new UserController();
