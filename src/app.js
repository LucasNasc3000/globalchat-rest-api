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
