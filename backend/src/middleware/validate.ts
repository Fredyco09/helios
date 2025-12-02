import type { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateQuery = (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) return next({ status: 400, message: parsed.error.message });
    Object.assign(req.query, parsed.data);
    next();
  };
