import { Repository } from 'typeorm';
import AppDataSource from '../config/db';
import { Billing } from '../models/billing';
import { Country } from '../models/country';
import { Jurisdiction } from '../models/jurisdiction';
import { Discount } from '../models/discount';
import { Promotion } from '../models/promotion';

class BillingService {
  private billingRepository: Repository<Billing>;
  private countryRepository: Repository<Country>;
  private jurisdictionRepository: Repository<Jurisdiction>;
  private promotionRepository: Repository<Promotion>;
  private discountRepository: Repository<Discount>;

  constructor() {
    this.billingRepository = AppDataSource.getRepository(Billing);
    this.countryRepository = AppDataSource.getRepository(Country);
    this.jurisdictionRepository = AppDataSource.getRepository(Jurisdiction);
    this.promotionRepository = AppDataSource.getRepository(Promotion);
    this.discountRepository = AppDataSource.getRepository(Discount);
  }

  async createAndFetchBilling(data: {
    user_id: number;
    country_id?: number;
    jurisdiction_id?: number;
    promotion_id?: number;
    discount_id?: number;
    billing_fee: number;
    event_type: string;
  }): Promise<Billing[]> {
    try {
      // Create a new billing record if data is provided
      if (data) {
        // Ensure related entities exist
        const country = data.country_id ? await this.countryRepository.findOne({ where: { country_id: data.country_id } }) : null;
        const jurisdiction = data.jurisdiction_id ? await this.jurisdictionRepository.findOne({ where: { id: data.jurisdiction_id } }) : null;
        const promotion = data.promotion_id ? await this.promotionRepository.findOne({ where: { promotion_id: data.promotion_id } }) : null;
        const discount = data.discount_id ? await this.discountRepository.findOne({ where: { discount_Id: data.discount_id } }) : null;

        const billingData: Partial<Billing> = {
          user_id: data.user_id,
          country: country || null,
          jurisdiction: jurisdiction || null,
          promotion: promotion || null,
          discount: discount || null,
          billing_fee: data.billing_fee,
          event_type: data.event_type
        };

        await this.createBilling(billingData);
      }

      // Fetch all billing records with relations
      const billings = await this.billingRepository.find({
        relations: ['country', 'jurisdiction', 'promotion', 'discount']
      });

      console.log("Fetched Billings (raw):", JSON.stringify(billings, null, 2));

      if (billings.length === 0) {
        console.log("No records found in the billing table.");
      }

      const processedBillings = billings.map(billing => {
        let applied_discount = null;
        let applied_margin = null;

        if (billing.country && billing.jurisdiction) {
          const countryDiscountApplied = billing.country.country_discount_applied ?? 0;
          const jurisdictionDiscountApplied = billing.jurisdiction.juris_discount_applied ?? 0;

          const { country_buy_margin, country_sell_margin } = billing.country;
          const { buy_margin, sell_margin } = billing.jurisdiction;

          if (countryDiscountApplied === 0 && jurisdictionDiscountApplied === 0) {
            // Take values from jurisdiction
            applied_discount = jurisdictionDiscountApplied;
            applied_margin = billing.event_type === 'buy' ? buy_margin : sell_margin;
          } else if (countryDiscountApplied > jurisdictionDiscountApplied) {
            // Take values from country
            applied_discount = countryDiscountApplied;
            applied_margin = billing.event_type === 'buy' ? country_buy_margin : country_sell_margin;
          } else {
            // Take values from jurisdiction
            applied_discount = jurisdictionDiscountApplied;
            applied_margin = billing.event_type === 'buy' ? buy_margin : sell_margin;
          }
        }

        return {
          ...billing,
          applied_discount,
          applied_margin
        };
      });

      return processedBillings.filter(billing => billing.applied_discount !== null && billing.applied_margin !== null);
    } catch (error) {
      console.error("Error creating or fetching billings:", error);
      throw error;
    }
  }

  private async createBilling(data: Partial<Billing>): Promise<Billing> {
    const billing = this.billingRepository.create(data);
    return this.billingRepository.save(billing);
  }
}

export default new BillingService();
