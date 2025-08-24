// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import _ from 'lodash';

// import { StatusCodes } from 'http-status-codes';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      req.cleanBody = _.pick(req.body, Object.keys(schema.shape));
      next();
    } catch (error) {
      if (error instanceof ZodError) {
      const errorMessages = error.issues.map((issue: any) => ({
            // message: `${issue.path.join('.')} is ${issue.message}`,
            message: `${issue.message}`,
        }))
        // res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
        res.status(400).json({ error: 'Invalid data', details: errorMessages });
      } else {
        console.error(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}