"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable camelcase */
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('foto');

class FotoController {
  store(req, res) {
    // eslint-disable-next-line consistent-return
    return upload(req, res, async (err) => {
      if (err) {
        return res.json({
          errors: [err.code],
        });
      }
      /* Caso não se coloque id a foto vai ser salva mesmo assim porque
      o allowNull está como true. --> CORRIGIR
      A maioria dos erros se dará porque o id do aluno não existe, por isso no catch
      só tem esse erro */
      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;

        const foto = await _Foto2.default.create({ originalname, filename, aluno_id });
        return res.json(foto);
        /*
       caso der erro, uma opção é colocar return no começo desta
       linha. Faz parte da regra do eslint desativada na linha 8
      */
      } catch (e) {
        return res.status(400).json({
          errors: ['O aluno não existe'],
        });
      }
    });
  }
}

exports. default = new FotoController();
