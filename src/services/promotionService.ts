import { Repository } from 'typeorm';
import AppDataSource from '../config/db';
import { Promotion } from '../models/promotion';

class PromotionService {
  private promotionRepository: Repository<Promotion>;

  constructor() {
    this.promotionRepository = AppDataSource.getRepository(Promotion);
  }

  async createPromotion(data: Partial<Promotion>): Promise<Promotion> {
    const promotion = this.promotionRepository.create(data);
    return this.promotionRepository.save(promotion);
  }

  async getAllPromotions(): Promise<Promotion[]> {
    return this.promotionRepository.find();
  }

  async getPromotionById(id: number): Promise<Promotion | null> {
    return this.promotionRepository.findOneBy({promotion_id: id});
  }

  async updatePromotion(id: number, data: Partial<Promotion>): Promise<Promotion | null> {
    const promotion = await this.promotionRepository.findOneBy({promotion_id: id});
    if (!promotion) {
      return null;
    }
    this.promotionRepository.merge(promotion, data);
    return this.promotionRepository.save(promotion);
  }

  async deletePromotion(id: number): Promise<boolean> {
    const result = await this.promotionRepository.delete(id);
    return result.affected !== 0;
  }
}

export default new PromotionService();
