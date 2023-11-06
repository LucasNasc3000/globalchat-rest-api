"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');

_dotenv2.default.config();

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _home = require('./routes/home'); var _home2 = _interopRequireDefault(_home);
var _user = require('./routes/user'); var _user2 = _interopRequireDefault(_user);
var _token = require('./routes/token'); var _token2 = _interopRequireDefault(_token);
var _aluno = require('./routes/aluno'); var _aluno2 = _interopRequireDefault(_aluno);
var _foto = require('./routes/foto'); var _foto2 = _interopRequireDefault(_foto);

/* O parâmetro origin vai ser setado (definido) pelo browser quando algum domínio ou ip tentar
 tentar acessar a api rest por meio de um cabeçalho origin que ele coloca.
Nem todo browser usa este cabeçalho (que pode ser undefined também) */

/* const whiteList = [
  'http://34.95.243.0',
  'http://localhost:3001',
]; */

/* Verifica se o que foi definido pelo browser no cabeçalho origin
 corresponde a um dos índices da whiteList ou se este cabeçalho não
 existe (não é usado pelo browser). Caso uma destas condições seja
 verdadeira, o cors libera o acesso à api rest
*/
/* const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('not allowed by CORS'));
    }
  },
}; */

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, {
      origin: '*',
    }));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'images'))); // Permite acessar arquivos estáticos, neste caso os de dentro da pasta "uploads"
  }

  routes() {
    this.app.use('/', _home2.default);
    this.app.use('/users/', _user2.default);
    this.app.use('/tokens/', _token2.default);
    this.app.use('/alunos/', _aluno2.default);
    this.app.use('/fotos/', _foto2.default);
  }
}

exports. default = new App().app;
