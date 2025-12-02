import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import airportsRoutes from './routes/airports.routes';
import airlinesRoutes from './routes/airlines.routes';
import tripsRoutes from './routes/trips.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(pinoHttp({ level: process.env.REQUEST_LOG_LEVEL || 'info' }));

app.use('/api/airports', airportsRoutes);
app.use('/api/airlines', airlinesRoutes);
app.use('/api/trips', tripsRoutes);

app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/', (_req, res) => {
  res.type('text/plain').send('Helios API is running. See /health and /api/* endpoints.');
});


app.use(errorHandler);

export default app;
