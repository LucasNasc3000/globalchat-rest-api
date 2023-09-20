/* eslint-disable camelcase */
import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');

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

        const foto = await Foto.create({ originalname, filename, aluno_id });
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

export default new FotoController();
