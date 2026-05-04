import { Router } from 'express';
import userRouter from './user.routes';
import movieRouter from './movie.routes';
import authRouter from './auth.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

export default router;
