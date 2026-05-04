import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', AuthController.login);
router.get('/me', protect, AuthController.getMe);
router.get('/logout', AuthController.logout);

export default router;
