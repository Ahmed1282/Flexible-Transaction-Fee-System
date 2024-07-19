import { NextFunction, Request, Response } from 'express';
import { DiscountService } from '../services/discountService';
import { StatusCodes } from 'http-status-codes';

const discountService = new DiscountService();

export const getAllDiscounts = async (req: Request, res: Response) => {
  const discounts = await discountService.getAllDiscounts();
  res.status(StatusCodes.OK).json(discounts);
};

export const getDiscountById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const discount = await discountService.getDiscountById(Number(id));
  if (discount) {
    res.status(StatusCodes.OK).json(discount);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Discount not found' });
  }
};

export const createDiscount = async (req: Request, res: Response) => {
    console.log('Creating discount with body:', req.body);
  const discount = await discountService.createDiscount(req.body);
  res.status(StatusCodes.CREATED).json(discount);
};

export const updateDiscount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedDiscount = await discountService.updateDiscount(Number(id), req.body);
  if (updatedDiscount) {
    res.status(StatusCodes.OK).json(updatedDiscount);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Discount not found' });
  }
};

export const deleteDiscount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await discountService.deleteDiscount(Number(id));
  if (success) {
    res.status(StatusCodes.NO_CONTENT).end();
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Discount not found' });
  }
};

export const verifyCoupon = async (req: Request, res: Response, next: NextFunction) => {
  const { coupon, userId } = req.body;

  try {
    await discountService.verifyCoupon(coupon, userId);
    res.status(StatusCodes.OK).json({ message: 'Coupon is valid' });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
