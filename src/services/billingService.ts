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
  }): Promise<Partial<Billing>[]> {
    try {
      // Ensure related entities exist
      const country = data.country_id ? await this.countryRepository.findOneBy({ country_id: data.country_id }) : undefined;
      const jurisdiction = data.jurisdiction_id ? await this.jurisdictionRepository.findOneBy({ id: data.jurisdiction_id }) : undefined;
      if (!jurisdiction) {
        throw new Error('Jurisdiction is required and must exist.');
      }
      const promotion = data.promotion_id ? await this.promotionRepository.findOneBy({ promotion_id: data.promotion_id }) : undefined;
      const discount = data.discount_id ? await this.discountRepository.findOneBy({ discount_Id: data.discount_id }) : undefined;
      // Prepare billing data
      const billingData: Partial<Billing> = {
        user_id: data.user_id,
        country: country || undefined,
        jurisdiction: jurisdiction || undefined,
        promotion: promotion || undefined,
        discount: discount || undefined,
        billing_fee: data.billing_fee,
        event_type: data.event_type
      };
      // Create the billing record
      const createdBilling = await this.createBilling(billingData);
      // Fetch the created billing record by ID
      const billing = await this.billingRepository.findOne({
        where: { billing_id: createdBilling.billing_id },
        relations: ['country', 'jurisdiction', 'promotion', 'discount']
      });
      if (!billing) {
        console.log("Billing record not found.");
        return [];
      }
      // Process the fetched billing record
      const processedBilling: {
        billing_id: number;
        user_id: number;
        country_id?: number;
        jurisdiction_id?: number;
        promotion_id?: number;
        discount_id?: number;
        billing_fee: number;
        event_type: string;
        applied_discount?: number;
        applied_margin?: number;
        applied_entity?: Country | Jurisdiction;
      } = {
        billing_id: billing.billing_id,
        user_id: billing.user_id,
        country_id: billing.country?.country_id,
        jurisdiction_id: billing.jurisdiction?.id,
        promotion_id: billing.promotion?.promotion_id,
        discount_id: billing.discount?.discount_Id,
        billing_fee: billing.billing_fee,
        event_type: billing.event_type,
      };
      if (billing.jurisdiction) {
        const countryDiscountApplied = billing.country?.country_discount_applied ?? 0;
        const jurisdictionDiscountApplied = billing.jurisdiction.juris_discount_applied ?? 0;
        const { country_buy_margin, country_sell_margin } = billing.country || {};
        const { buy_margin, sell_margin } = billing.jurisdiction;
        if (countryDiscountApplied === 0 && jurisdictionDiscountApplied === 0) {
          processedBilling.applied_discount = jurisdictionDiscountApplied;
          processedBilling.applied_margin = billing.event_type === 'buy' ? buy_margin : sell_margin;
          processedBilling.applied_entity = billing.jurisdiction;
        } else if (countryDiscountApplied > jurisdictionDiscountApplied) {
          processedBilling.applied_discount = countryDiscountApplied;
          processedBilling.applied_margin = billing.event_type === 'buy' ? country_buy_margin : country_sell_margin;
          processedBilling.applied_entity = billing.country || undefined;
        } else {
          processedBilling.applied_discount = jurisdictionDiscountApplied;
          processedBilling.applied_margin = billing.event_type === 'buy' ? buy_margin : sell_margin;
          processedBilling.applied_entity = billing.jurisdiction;
        }
      }
      return [processedBilling];
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