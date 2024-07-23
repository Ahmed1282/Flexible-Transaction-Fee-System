import { Repository } from 'typeorm';
import AppDataSource from '../config/db';
import { Billing } from '../models/billing';
import { Country } from '../models/country';
import { Jurisdiction } from '../models/jurisdiction';

class BillingService {
  private billingRepository: Repository<Billing>;
  private countryRepository: Repository<Country>;
  private jurisdictionRepository: Repository<Jurisdiction>;

  constructor() {
    this.billingRepository = AppDataSource.getRepository(Billing);
    this.countryRepository = AppDataSource.getRepository(Country);
    this.jurisdictionRepository = AppDataSource.getRepository(Jurisdiction);
  }

  async createBilling(data: Partial<Billing>): Promise<Billing> {
    const billing = this.billingRepository.create(data);
    return this.billingRepository.save(billing);
  }

  async fetchBilling(): Promise<Billing[]> {
    try {
      const billings = await this.billingRepository.find({
        relations: ['country', 'jurisdiction', 'promotion', 'discount']
      });
  
      console.log("Fetched Billings:", JSON.stringify(billings, null, 2));
  
      return billings.map(billing => {
        if (
          billing.country &&
          billing.jurisdiction &&
          billing.country.country_discount_applied !== null &&
          billing.jurisdiction.juris_discount_applied !== null
        ) {
          if (
            billing.country.country_discount_applied === 0 &&
            billing.jurisdiction.juris_discount_applied === 0
          ) {
            // Take values from jurisdiction
            return {
              ...billing,
              applied_discount: billing.jurisdiction.juris_discount_applied,
              applied_margin: billing.event_type === 'buy' ? billing.jurisdiction.buy_margin : billing.jurisdiction.sell_margin
            };
          } else if (
            billing.country.country_discount_applied > billing.jurisdiction.juris_discount_applied
          ) {
            // Take values from country
            return {
              ...billing,
              applied_discount: billing.country.country_discount_applied,
              applied_margin: billing.event_type === 'buy' ? billing.country.country_buy_margin : billing.country.country_sell_margin
            };
          } else {
            // Take values from jurisdiction
            return {
              ...billing,
              applied_discount: billing.jurisdiction.juris_discount_applied,
              applied_margin: billing.event_type === 'buy' ? billing.jurisdiction.buy_margin : billing.jurisdiction.sell_margin
            };
          }
        } else {
          return billing;
        }
      });
    } catch (error) {
      console.error("Error fetching billings:", error);
      throw error;
    }
  }
  

  // Add other methods like getBilling, updateBilling, deleteBilling as needed
}

export default new BillingService();
