import AppDataSource from '../config/db';
import { Jurisdiction } from '../models/jurisdiction';
import { Discount } from '../models/discount';

export class JurisdictionService {
  private jurisdictionRepository = AppDataSource.getRepository(Jurisdiction);
  private discountRepository = AppDataSource.getRepository(Discount);

  async getAllJurisdictions(): Promise<Jurisdiction[]> {
    return this.jurisdictionRepository.find();
  }

  async getJurisdictionById(id: number): Promise<Jurisdiction | null> {
    return this.jurisdictionRepository.findOneBy({ id });
  }

  async createJurisdiction(data: Partial<Jurisdiction>): Promise<Jurisdiction> {
    const jurisdiction = this.jurisdictionRepository.create(data);
    // const discount = await this.discountRepository.findOneBy({ discount_Id: data.discount_Id?.discount_Id });

    // if (discount && data.jurisdiction_discount) {
    //   jurisdiction.juris_discount_applied = Math.max(discount.discount_percentage, data.jurisdiction_discount.percentage);
    // } else if (discount) {
    //   jurisdiction.juris_discount_applied = discount.discount_percentage;
    // } else if (data.jurisdiction_discount) {
    //   jurisdiction.juris_discount_applied = data.jurisdiction_discount.percentage;
    // } else {
    //   jurisdiction.juris_discount_applied = 0;
    // }

    return this.jurisdictionRepository.save(jurisdiction);
  }

  async updateJurisdiction(id: number, data: Partial<Jurisdiction>): Promise<Jurisdiction | null> {
    const jurisdiction = await this.jurisdictionRepository.findOneBy({ id });
    if (jurisdiction) {
      this.jurisdictionRepository.merge(jurisdiction, data);

      // const discount = await this.discountRepository.findOneBy({ discount_Id: data.discount_Id?.discount_Id });

      // if (discount && data.jurisdiction_discount) {
      //   jurisdiction.juris_discount_applied = Math.min(discount.discount_percentage, data.jurisdiction_discount.percentage);
      // } else if (discount) {
      //   jurisdiction.juris_discount_applied = discount.discount_percentage;
      // } else if (data.jurisdiction_discount) {
      //   jurisdiction.juris_discount_applied = data.jurisdiction_discount.percentage;
      // } else {
      //   jurisdiction.juris_discount_applied = 0;
      // }

      return this.jurisdictionRepository.save(jurisdiction);
    }
    return null;
  }

  async deleteJurisdiction(id: number): Promise<boolean> {
    const result = await this.jurisdictionRepository.delete(id);
    return result.affected !== 0;
  }
}
