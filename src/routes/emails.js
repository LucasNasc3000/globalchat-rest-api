import { Router } from 'express';
import emails from '../controllers/Emails';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, emails.SendEmail); // envia emails

export default router;
