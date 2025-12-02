import { Router } from 'express';
import { z } from 'zod';
import { validateQuery } from '../middleware/validate';
import { run } from '../services/neo4j';
import neo4j from 'neo4j-driver';

const r = Router();

const q = z.object({
  country: z.string().min(1),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(200).default(50),
  sort: z.enum(['city','name','iata']).default('city')
});

r.get('/by-country', validateQuery(q), async (req, res, next) => {
  try {
    const { country, page, pageSize, sort } = req.query as any;
    const pageNum = Number(page);
    const sizeNum = Number(pageSize);
    const skip = (pageNum - 1) * sizeNum;

    

    const totalRows = await run(
        `MATCH (a:Airport {country:$country}) WHERE a.iata IS NOT NULL
        RETURN count(a) AS c`,
        { country }
    );

    const items = await run(
        `MATCH (a:Airport {country:$country}) WHERE a.iata IS NOT NULL
        RETURN a.iata AS iata, a.name AS name, a.city AS city, a.country AS country
        ORDER BY ${sort} ASC
        SKIP $skip LIMIT $limit`,
        { country, skip: neo4j.int(skip), limit: neo4j.int(sizeNum) }
    );

    res.json({
    page: pageNum,
    pageSize: sizeNum,
    total: totalRows[0]?.c?.low ?? totalRows[0]?.c ?? 0,
    items
    });
  } catch (e) { next(e); }
});

export default r;
