import { Router } from 'express';
import { z } from 'zod';
import { validateQuery } from '../middleware/validate';
import { shortestTrip, constrainedTrip, boundedReachable } from '../controllers/trips.controller';

const r = Router();

const shortestQ = z.object({
  srcIata: z.string().min(2),
  dstIata: z.string().min(2),
  maxHops: z.coerce.number().int().min(1).max(12).default(8)
});

const constrainedQ = z.object({
  srcIata: z.string().min(2),
  dstIata: z.string().min(2),
  zStops: z.coerce.number().int().min(0).max(5).default(1),
  maxHops: z.coerce.number().int().min(1).max(12).default(8)
});

const boundedQ = z.object({
  iata: z.string().min(2),
  d: z.coerce.number().int().min(1).max(8).default(3)
});

r.get('/shortest', validateQuery(shortestQ), async (req, res, next) => {
  try {
    const { srcIata, dstIata, maxHops } = req.query as any;
    res.json(await shortestTrip(srcIata, dstIata, Number(maxHops)));
  } catch (e) { next(e); }
});

r.get('/constrained', validateQuery(constrainedQ), async (req, res, next) => {
  try {
    const { srcIata, dstIata, zStops, maxHops } = req.query as any;
    res.json(await constrainedTrip(srcIata, dstIata, Number(zStops), Number(maxHops)));
  } catch (e) { next(e); }
});

r.get('/bounded', validateQuery(boundedQ), async (req, res, next) => {
  try {
    const { iata, d } = req.query as any;
    res.json(await boundedReachable(iata, Number(d)));
  } catch (e) { next(e); }
});

export default r;
