import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);
router.get('/:id', UserController.getUserById);

export default router;
