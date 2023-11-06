import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import express from 'express';
import cors from 'cors';
import homeRoutes from './routes/home';
import userRoutes from './routes/user';
import tokenRoutes from './routes/token';
import alunoRoutes from './routes/aluno';
import fotoRoutes from './routes/foto';

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
    this.app.use(express.static(resolve(__dirname, '..', 'uploads', 'images'))); // Permite acessar arquivos estáticos, neste caso os de dentro da pasta "uploads"
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
  }
}

export default new App().app;
