import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

const jurisdictionValidationRules = () => {
  return [
    body("UserFeeShare")
      .isFloat({ gt: 0 })
      .withMessage("UserFeeShare must be a positive number"),
    body("tax")
      .isFloat({ gt: 0 })
      .withMessage("Tax must be a positive number"),
    body("discount")
      .isObject()
      .withMessage("Discount must be a valid JSON object"),
    body("buy_margin")
      .isFloat({ gt: 0 })
      .withMessage("Buy margin must be a positive number"),
    body("sell_margin")
      .isFloat({ gt: 0 })
      .withMessage("Sell margin must be a positive number"),
    body("FassetFee")
      .isFloat({ gt: 0 })
      .withMessage("FassetFee must be a positive number"),
    body("dinariConstantFee")
      .isFloat({ gt: 0 })
      .withMessage("DinariConstantFee must be a positive number"),
    body("dinariPercentageFee")
      .isFloat({ gt: 0 })
      .withMessage("DinariPercentageFee must be a positive number"),
  ];
};

const validateJurisdiction = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};

export { jurisdictionValidationRules, validateJurisdiction };
