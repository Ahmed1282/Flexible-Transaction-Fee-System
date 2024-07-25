// import { Repository } from 'typeorm';
// import AppDataSource from '../config/db';
// import { Billing } from '../models/billing';
// import { Country } from '../models/country';
// import { Jurisdiction } from '../models/jurisdiction';
// import { Promotion } from '../models/promotion';
// import { Discount } from '../models/discount';
// class BillingService {
//   private billingRepository: Repository<Billing>;
//   private countryRepository: Repository<Country>;
//   private jurisdictionRepository: Repository<Jurisdiction>;
//   private promotionRepository: Repository<Promotion>;
//   private discountRepository: Repository<Discount>;
//   constructor() {
//     this.billingRepository = AppDataSource.getRepository(Billing);
//     this.countryRepository = AppDataSource.getRepository(Country);
//     this.jurisdictionRepository = AppDataSource.getRepository(Jurisdiction);
//     this.promotionRepository = AppDataSource.getRepository(Promotion);
//     this.discountRepository = AppDataSource.getRepository(Discount);
//   }
//   async createAndFetchBilling(data: {
//     user_id: number;
//     country_id?: number;
//     jurisdiction_id: number;
//     promotion_id?: number;
//     discount_id?: number;
//     billing_fee: number;
//     event_type: string;
//   }): Promise<Partial<Billing> | null> {
//     try {
//       // Fetch related entities
//       const country = data.country_id ? await this.countryRepository.findOneBy({ country_id: data.country_id }) : undefined;
//       const jurisdiction = data.jurisdiction_id ? await this.jurisdictionRepository.findOneBy({ id: data.jurisdiction_id }) : undefined;
//       const promotion = data.promotion_id ? await this.promotionRepository.findOneBy({ promotion_id: data.promotion_id }) : undefined;
//       const discount = data.discount_id ? await this.discountRepository.findOneBy({ discount_Id: data.discount_id }) : undefined;
//       if (!jurisdiction) {
//         throw new Error("Jurisdiction is required.");
//       }
//       let appliedDiscount: number | undefined = undefined;
//       let appliedMargin: number | undefined = undefined;
//       let appliedEntity: 'Country' | 'Jurisdiction' | null = null;
//       if (country) {
//         const countryDiscountApplied = country.country_discount_applied ?? 0;
//         const jurisdictionDiscountApplied = jurisdiction.juris_discount_applied ?? 0;
//         const { country_buy_margin, country_sell_margin } = country;
//         const { buy_margin, sell_margin } = jurisdiction;
//         if (countryDiscountApplied > jurisdictionDiscountApplied) {
//           appliedDiscount = countryDiscountApplied;
//           appliedMargin = data.event_type === 'buy' ? country_buy_margin : country_sell_margin;
//           appliedEntity = 'Country'; // Use country if its discount is higher
//         } else {
//           appliedDiscount = jurisdictionDiscountApplied;
//           appliedMargin = data.event_type === 'buy' ? buy_margin : sell_margin;
//           appliedEntity = 'Jurisdiction'; // Otherwise use jurisdiction
//         }
//       } else {
//         appliedDiscount = jurisdiction.juris_discount_applied ?? 0;
//         appliedMargin = data.event_type === 'buy' ? jurisdiction.buy_margin : jurisdiction.sell_margin;
//         appliedEntity = 'Jurisdiction'; // Only jurisdiction available
//       }
//       const billingData: Partial<Billing> = {
//         user_id: data.user_id,
//         country: country || undefined,
//         jurisdiction: jurisdiction || undefined,
//         promotion: promotion || undefined,
//         discount: discount || undefined,
//         billing_fee: data.billing_fee,
//         event_type: data.event_type,
//         applied_discount: appliedDiscount,
//         applied_margin: appliedMargin
//       };
//       // Create the billing record
//       const createdBilling = await this.createBilling(billingData);
//       // Fetch the created billing record by ID
//       const billing = await this.billingRepository.findOne({
//         where: { billing_id: createdBilling.billing_id },
//         relations: ['country', 'jurisdiction', 'promotion', 'discount']
//       });
//       if (!billing) {
//         console.log("Billing record not found.");
//         return null;
//       }
//       // Return only the relevant entity based on applied discount
//       const response: {
//         billing_id: number;
//         user_id: number;
//         jurisdiction_id: number;
//         country_id: number;
//         promotion_id: number;
//         billing_fee: number;
//         event_type: string;
//         applied_discount?: number;
//         applied_margin?: number;
//         country?: Country; // Optional property
//         jurisdiction?: Jurisdiction; // Optional property
//       } = {
//         billing_id: billing.billing_id,
//         user_id: billing.user_id,
//         jurisdiction_id: billing.jurisdiction_id,
//         country_id: billing.country_id!,
//         promotion_id: billing.promotion_id!,
//         billing_fee: billing.billing_fee,
//         event_type: billing.event_type,
//         applied_discount: billing.applied_discount,
//         applied_margin: billing.applied_margin
//       };
//       // Conditionally add properties
//       if (appliedEntity === 'Country') {
//         response.country = billing.country!;
//       } else if (appliedEntity === 'Jurisdiction') {
//         response.jurisdiction = billing.jurisdiction!;
//       }
//       return response;
//     } catch (error) {
//       console.error("Error creating or fetching billings:", error);
//       throw error;
//     }
//   }
//   private async createBilling(data: Partial<Billing>): Promise<Billing> {
//     const billing = this.billingRepository.create(data);
//     return this.billingRepository.save(billing);
//   }
// }
// export default new BillingService();