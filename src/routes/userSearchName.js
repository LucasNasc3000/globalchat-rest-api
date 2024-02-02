import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import userSearchController from '../controllers/UserSearch';

const router = new Router();

router.get('/:username', loginRequired, userSearchController.searchByName); // Pesquisa um usuário pelo nome

export default router;
