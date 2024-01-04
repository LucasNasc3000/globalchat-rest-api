import { Router } from 'express';
import userController from '../controllers/User'; // O home controller não é importado aqui com maiúsculo para não ser importado como objeto da classe em vez da classe em si, porque a classe já tem o 'h' maiúsculo
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', userController.store);

// Estes dois não poderiam ser colocados em uma aplicação real
router.get('/', userController.index); // Lista todos os usuários, com todos os seus dados

router.put('/', loginRequired, userController.update);
router.delete(':id', loginRequired, userController.delete);

export default router;
