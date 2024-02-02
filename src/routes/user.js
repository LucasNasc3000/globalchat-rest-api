import { Router } from 'express';
import userController from '../controllers/User'; // O home controller não é importado aqui com maiúsculo para não ser importado como objeto da classe em vez da classe em si, porque a classe já tem o 'h' maiúsculo
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', userController.store); // Cria o usuário
router.get('/', loginRequired, userController.usersList); // Lista todos os usuários, com todos os seus dados
router.delete('/:id', loginRequired, userController.delete); // Deleta um usuário e seus dados
router.put('/:id', loginRequired, userController.update); // Atualiza os dados do usuário (exceto email)

export default router;
