import type { Request, Response, NextFunction } from 'express';
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status || 500;
  const msg = err.message || 'Internal Server Error';
  res.status(status).json({ error: msg, detail: process.env.NODE_ENV === 'development' ? err : undefined });
}
