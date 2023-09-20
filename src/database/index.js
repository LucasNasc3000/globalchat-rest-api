// eslint-disable-next-line import/no-extraneous-dependencies
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../models/Aluno';
import User from '../models/User';
import Foto from '../models/Foto';

const models = [Aluno, User, Foto]; // Caso houvessem outros models, eles viriam para este array

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
// Verifica se existe o método associate antes de executar e depois executa todos os models
models.forEach((model) => model.associate && model.associate(connection.models));
