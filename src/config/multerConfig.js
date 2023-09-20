import multer, { MulterError } from 'multer';
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);
/*
com o numero aleatorio gerado entre 10000 e 20000 vai haver a garantia
de que dois arquivos não serão enviados ao servidor no mesmo milissegundo
*/

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('O arquivo precisa ser PNG ou JPG'));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({ // disk storage vai salvar a foto no servidor (3001 ou o do gcp)
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images')); // o primeiro parâmetro é para caso ocorra algum erro
    },
    filename: (req, file, cb) => { // usar o nome original do arquivo traria problemas ao sistema
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`); // muda o nome original do arquivo. Primeiro coloca a data exata do envio do arquivo com o Date.now(), depois extrai somente o .jpg ou .png do nome original do arquivo com a função extname
    },
  }),
};
