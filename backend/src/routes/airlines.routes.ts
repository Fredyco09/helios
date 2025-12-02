import { Router } from 'express';
import { z } from 'zod';
import { validateQuery } from '../middleware/validate';
import { getAirlinesWithStops, getCodeShareAirlines, getActiveAirlinesInUS } from '../controllers/airlines.controller';

const r = Router();
const stopsQ = z.object({ stops: z.coerce.number().int().min(0).default(0) });

r.get('/with-stops', validateQuery(stopsQ), async (req, res, next) => {
  try { res.json(await getAirlinesWithStops(Number(req.query.stops))); }
  catch (e) { next(e); }
});

r.get('/codeshare', async (_req, res, next) => {
  try { res.json(await getCodeShareAirlines()); }
  catch (e) { next(e); }
});

r.get('/active-us', async (_req, res, next) => {
  try { res.json(await getActiveAirlinesInUS()); }
  catch (e) { next(e); }
});

export default r;
