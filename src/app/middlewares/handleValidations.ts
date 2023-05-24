import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    const arrayErrors: object[] = [];

    errors.array().map((err) => {
        arrayErrors.push({error: err.msg});
    });

    return res.status(422).json({
        errors: arrayErrors
    });
};
