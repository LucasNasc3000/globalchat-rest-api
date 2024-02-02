import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import userSearchController from '../controllers/UserSearch';

const router = new Router();

router.get('/:id', loginRequired, userSearchController.searchById); // Pesquisa um usuário pelo id

export default router;
