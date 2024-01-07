import { Router } from 'express';
import userController from '../controllers/User'; // O home controller não é importado aqui com maiúsculo para não ser importado como objeto da classe em vez da classe em si, porque a classe já tem o 'h' maiúsculo
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', userController.store); // Cria o usuário
router.get('/', loginRequired, userController.usersList); // Lista todos os usuários, com todos os seus dados
router.get('/:useremail', loginRequired, userController.search); // Traz os dados de um usuário
router.put('/:useremail', loginRequired, userController.userBan); // Bane um usuário (tira o acesso à página mas não deleta a conta)

export default router;
