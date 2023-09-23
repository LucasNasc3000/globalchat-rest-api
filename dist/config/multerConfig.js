"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);
/*
com o numero aleatorio gerado entre 10000 e 20000 vai haver a garantia
de que dois arquivos não serão enviados ao servidor no mesmo milissegundo
*/

exports. default = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new _multer2.default.MulterError('O arquivo precisa ser PNG ou JPG'));
    }
    return cb(null, true);
  },
  storage: _multer2.default.diskStorage({ // disk storage vai salvar a foto no servidor (3001 ou o do gcp)
    destination: (req, file, cb) => {
      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'images')); // o primeiro parâmetro é para caso ocorra algum erro
    },
    filename: (req, file, cb) => { // usar o nome original do arquivo traria problemas ao sistema
      cb(null, `${Date.now()}_${aleatorio()}${_path.extname.call(void 0, file.originalname)}`); // muda o nome original do arquivo. Primeiro coloca a data exata do envio do arquivo com o Date.now(), depois extrai somente o .jpg ou .png do nome original do arquivo com a função extname
    },
  }),
};
