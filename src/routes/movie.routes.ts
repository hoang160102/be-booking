import { Router } from 'express';
import MovieController from '../controllers/movie.controller';

const router = Router();

router.get('/', MovieController.getAllMovies);
router.get('/:slug', MovieController.getMovieBySlug);
router.post('/', MovieController.createMovie);

export default router;
