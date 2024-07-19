import AppDataSource from '../config/db';
import { Discount } from '../models/discount';
import { StatusCodes } from 'http-status-codes';

export class DiscountService {
  private discountRepository = AppDataSource.getRepository(Discount);

  async getAllDiscounts(): Promise<Discount[]> {
    return this.discountRepository.find();
  }

  async getDiscountById(id: number): Promise<Discount | null> {
    return this.discountRepository.findOneBy({ discount_Id: id });
  }

  async createDiscount(data: Partial<Discount>): Promise<Discount> {
    const discount = this.discountRepository.create(data);
    return this.discountRepository.save(discount);
  }

  async updateDiscount(id: number, data: Partial<Discount>): Promise<Discount | null> {
    const discount = await this.discountRepository.findOneBy({ discount_Id: id });
    if (discount) {
      this.discountRepository.merge(discount, data);
      return this.discountRepository.save(discount);
    }
    return null;
  }

  async deleteDiscount(id: number): Promise<boolean> {
    const result = await this.discountRepository.delete(id);
    return result.affected !== 0;
  }
  
  async verifyCoupon(coupon: string, userId: number): Promise<boolean> {
    const discount = await this.discountRepository.findOne({ where: { discount_code: coupon } });

    if (!discount) {
      throw new Error(`Coupon not found`);
    }

    if (discount.codeusedby && discount.codeusedby.includes(userId)) {
      throw new Error(`Coupon already used by this user`);
    }

    return true;
  }
}
