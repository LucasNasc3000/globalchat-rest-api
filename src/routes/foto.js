import { Router } from 'express';
import fotoController from '../controllers/Foto';
import loginRequired from '../middlewares/loginRequired';
// importações de módulo vêm antes das locais

const router = new Router();

router.post('/', loginRequired, fotoController.store); // 'foto' é o nome do lado do arquivo no multipart form na pasta fotos no insomnia

export default router;
