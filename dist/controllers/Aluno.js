"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'altura', 'peso'], // quando todos forem listados somente estes campos aparecerão
      order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']], // mostra os alunos e seus dados em ordem decrescente
      include: {
        model: _Foto2.default,
        attributes: ['url', 'filename', 'originalname', 'updated_at'],
      },
    });
    res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);

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

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'altura', 'peso'], // quando todos forem listados somente estes campos aparecerão
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']], // mostra os alunos e seus dados em ordem decrescente
        include: {
          model: _Foto2.default,
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

      const aluno = await _Aluno2.default.findByPk(id);

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

      const aluno = await _Aluno2.default.findByPk(id);

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

exports. default = new AlunoController();
