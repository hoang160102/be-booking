import { Request, Response, NextFunction } from 'express';
import Movie from '../models/Movie';

class MovieController {
  public static async getAllMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const movies = await Movie.find();
      res.status(200).json({
        success: true,
        count: movies.length,
        data: movies,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async createMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movieData = req.body;
      
      if (!movieData.slug && movieData.title) {
        movieData.slug = movieData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      }

      const movie = await Movie.create(movieData);
      res.status(201).json({
        success: true,
        data: movie,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getMovieBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const movie = await Movie.findOne({ slug });
      
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: 'Movie not found',
        });
      }

      res.status(200).json({
        success: true,
        data: movie,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default MovieController;
