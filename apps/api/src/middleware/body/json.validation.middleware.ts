import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';
import logger from '@/config/logger.js';

export function validateData(schema: z.ZodTypeAny) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body)
            next();
        } catch (err) {

            if (err instanceof ZodError) {
                res.status(StatusCodes.BAD_REQUEST).json({ 
                    error: 'Invalid data',
                    issues: err.issues.map(e => ({
                        path: e.path.join("."),
                        message: e.message,
                        code: e.code
                    }))
                });
            } else {
                next(err)
            }

        }
    }
}