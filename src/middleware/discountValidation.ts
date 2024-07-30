import { body, check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validateDiscount = [
  check('discount_code').notEmpty().withMessage('Discount code cannot be empty'),
  check('discount_percentage').isFloat({ min: 0, max: 100 }).withMessage('Discount percentage must be between 0 and 100'),
  check('discount_applicable_jurisdiction').isBoolean().withMessage('Discount applicable jurisdiction must be a boolean'),
  check('discount_applicable_country').isBoolean().withMessage('Discount applicable country must be a boolean'),
  check('discount_applicable_promotion').isBoolean().withMessage('Discount applicable promotion must be a boolean'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { discount_applicable_jurisdiction, discount_applicable_country, discount_applicable_promotion } = req.body;

    const applicableFlags = [discount_applicable_jurisdiction, discount_applicable_country, discount_applicable_promotion];
    const trueCount = applicableFlags.filter(Boolean).length;

    if (trueCount > 1) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: [{ msg: 'Only one of discount_applicable_jurisdiction, discount_applicable_country, or discount_applicable_promotion can be true at a time' }] });
    }

    next();
  },
];

export const validateCoupon = [
  body('coupon').notEmpty().withMessage('Coupon is required'),
  body('userId').isInt().withMessage('User ID must be an integer'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    next();
  }
];
