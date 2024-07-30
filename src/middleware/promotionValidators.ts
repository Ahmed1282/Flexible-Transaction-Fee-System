import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export const validatePromotion = [
  check('promotion_name').notEmpty().withMessage('Promotion name cannot be empty'),

  // Check if promotion_discount is a float if it is presen

  // Custom validator to ensure either promotion_discount or promotion_margin is provided, but not both or neither
  (req: Request, res: Response, next: NextFunction) => {
    const { promotion_discount, promotion_margin } = req.body;

    if ((promotion_discount === null && promotion_margin === null) ||
        (promotion_discount !== null && promotion_margin !== null)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: [{ msg: 'Either promotion_discount or promotion_margin must be provided, but not both at the same time.' }]
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    next();
  },
];
