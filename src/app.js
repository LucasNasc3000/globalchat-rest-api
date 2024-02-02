// Tem q dar pm2 restart api a cada vez que fizer push
import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import homeRoutes from './routes/home';
import userRoutes from './routes/user';
import tokenRoutes from './routes/token';
import textRoutes from './routes/text';
import userSearchEmail from './routes/userSearchEmail';
import userSearchName from './routes/userSearchName';
import userSearchId from './routes/userSearchId';

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
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors({
      origin: '*',
    }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/users/search/email/', userSearchEmail);
    this.app.use('/users/search/name/', userSearchName);
    this.app.use('/users/search/id/', userSearchId);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/text/', textRoutes);
  }
}

export default new App().app;
