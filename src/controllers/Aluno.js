import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'altura', 'peso'], // quando todos forem listados somente estes campos aparecerão
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']], // mostra os alunos e seus dados em ordem decrescente
      include: {
        model: Foto,
        attributes: ['url', 'filename', 'originalname', 'updated_at'],
      },
    });
    res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.json(aluno);
    } catch (e) {
      return console.log(e);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'altura', 'peso'], // quando todos forem listados somente estes campos aparecerão
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']], // mostra os alunos e seus dados em ordem decrescente
        include: {
          model: Foto,
          attributes: ['url', 'filename', 'originalname', 'updated_at'],
        },
      });

      if (!aluno) {
        res.status(400).json({
          errors: ['O aluno não existe'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        res.status(400).json({
          errors: ['O aluno não existe'],
        });
      }

      await aluno.destroy();
      return res.json(`Aluno ${aluno.id} deletado`);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        res.status(400).json({
          errors: ['O aluno não existe'],
        });
      }

      const alunoNovosDados = await aluno.update(req.body);

      return res.json(alunoNovosDados);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AlunoController();
