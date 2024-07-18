import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export const validatePromotion = [
  check('promotion_type').notEmpty().withMessage('Promotion type cannot be empty'),
  check('promotion_discount').isFloat().withMessage('Promotion discount must be a float'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    next();
  },
];
