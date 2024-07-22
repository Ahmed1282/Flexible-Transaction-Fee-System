import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export const validateCountry = [
  check('country_name').notEmpty().withMessage('Country name cannot be empty'),  
  check('country_UserFeeShare').isFloat().withMessage('User Fee Share must be a float'),
  check('country_tax').isFloat().withMessage('Tax must be a float'),
  check('country_buy_margin').isFloat().withMessage('Buy margin must be a float'),
  check('country_sell_margin').isFloat().withMessage('Sell margin must be a float'),
  check('country_FassetFee').isFloat().withMessage('Fasset Fee must be a float'),
  check('country_dinariConstantFee').isFloat().withMessage('Dinari Constant Fee must be a float'),
  check('country_discount')
    .optional()
    .isObject().withMessage('Country discount must be an object')
    .custom((value) => {
      if (!value.name || typeof value.name !== 'string') {
        throw new Error('Country discount must have a name property of type string');
      }
      if (!value.percentage || typeof value.percentage !== 'number') {
        throw new Error('Country discount must have a value property of type number');
      }
      return true;
    }),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    next();
  },
];
