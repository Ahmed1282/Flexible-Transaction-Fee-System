import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export const validateJurisdiction = [
  check('jurisdiction_name').notEmpty().withMessage('Jurisdiction name cannot be empty'),
  check('UserFeeShare').isFloat().withMessage('User Fee Share must be a float'),
  check('tax').isFloat().withMessage('Tax must be a float'),
  check('jurisdiction_discount')
    .optional()
    .isObject().withMessage('Jurisdiction discount must be an object')
    .custom((value) => {
      if (!value.name || typeof value.name !== 'string') {
        throw new Error('Jurisdiction discount must have a name property of type string');
      }
      if (!value.percentage || typeof value.percentage !== 'number') {
        throw new Error('Jurisdiction discount must have a percentage property of type number');
      }
      return true;
    }),
  check('buy_margin').isFloat().withMessage('Buy margin must be a float'),
  check('sell_margin').isFloat().withMessage('Sell margin must be a float'),
  check('FassetFee').isFloat().withMessage('Fasset Fee must be a float'),
  check('dinariConstantFee').isFloat().withMessage('Dinari Constant Fee must be a float'),
  check('dinariPercentageFee').isFloat().withMessage('Dinari Percentage Fee must be a float'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    next();
  },
];
