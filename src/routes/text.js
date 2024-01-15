import { Router } from 'express';
import textController from '../controllers/Text'; // O home controller não é importado aqui com maiúsculo para não ser importado como objeto da classe em vez da classe em si, porque a classe já tem o 'h' maiúsculo
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, textController.store); // cria as mensagens
router.get('/', textController.index); // mostrar mensagens e quem enviou
router.delete('/:id', loginRequired, textController.delete); // deleta mensagens

export default router;
