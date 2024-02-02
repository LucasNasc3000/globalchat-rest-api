import { Router } from 'express';
import userController from '../controllers/User'; // O home controller não é importado aqui com maiúsculo para não ser importado como objeto da classe em vez da classe em si, porque a classe já tem o 'h' maiúsculo
import loginRequired from '../middlewares/loginRequired';
import userSearchController from '../controllers/UserSearch';

const router = new Router();

router.post('/', userController.store); // Cria o usuário
router.get('/', loginRequired, userController.usersList); // Lista todos os usuários, com todos os seus dados
router.delete('/:id', loginRequired, userController.delete); // Deleta um usuário e seus dados
router.put('/:id', loginRequired, userController.update); // Atualiza os dados do usuário (exceto email)
router.put('/:useremail', loginRequired, userController.banUser); // Atualiza os dados do usuário (exceto email)
router.get('/:useremail', loginRequired, userSearchController.searchByEmail); // Pesquisa um usuário pelo email
router.get('/:username', loginRequired, userSearchController.searchByName); // Pesquisa um usuário pelo nome
router.get('/:id', loginRequired, userSearchController.searchById); // Pesquisa um usuário pelo id

export default router;
