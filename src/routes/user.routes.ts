import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', protect, UserController.getUsers);
router.post('/', UserController.createUser);
router.get('/:id', protect, UserController.getUserById);

export default router;
