import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import userSearchController from '../controllers/UserSearch';

const router = new Router();

router.get('/:useremail', loginRequired, userSearchController.searchByEmail); // Pesquisa um usuário pelo email

export default router;
