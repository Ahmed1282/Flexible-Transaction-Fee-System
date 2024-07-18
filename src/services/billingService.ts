import { Repository } from 'typeorm';
import AppDataSource from '../config/db';
import { Billing } from '../models/billing';

class BillingService {
  private billingRepository: Repository<Billing>;

  constructor() {
    this.billingRepository = AppDataSource.getRepository(Billing);
  }

  async createBilling(data: Partial<Billing>): Promise<Billing> {
    const billing = this.billingRepository.create(data);
    return this.billingRepository.save(billing);
  }

  // Add other methods like getBilling, updateBilling, deleteBilling as needed
}

export default new BillingService();
