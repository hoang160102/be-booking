import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import router from './routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('hehe')
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: 'Server is healthy' });
});

// Error handling middleware
app.use(errorHandler);

export default app;
