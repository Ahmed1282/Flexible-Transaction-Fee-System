import { Repository } from 'typeorm';
import AppDataSource from '../config/db';
import {Country} from '../models/country';
import {Discount} from '../models/discount';

class CountryService {
  private countryRepository: Repository<Country>;
  private discountRepository = AppDataSource.getRepository(Discount);

  constructor() {
    this.countryRepository = AppDataSource.getRepository(Country);
  }

  async createCountry(data: Partial<Country>): Promise<Country> {
    const country = this.countryRepository.create(data);

    const discount = await this.discountRepository.findOneBy({ discount_Id: data.discount_Id?.discount_Id });

    if (discount && data.country_discount) {
      country.country_discount_applied = Math.max(discount.discount_percentage, data.country_discount.percentage);
    } else if (discount) {
      country.country_discount_applied = discount.discount_percentage;
    } else if (data.country_discount) {
      country.country_discount_applied = data.country_discount.percentage;
    } else {
      country.country_discount_applied = 0;
    }
    return this.countryRepository.save(country);
  }

  async getAllCountries(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  async getCountryById(id: number): Promise<Country | null> {
    return this.countryRepository.findOneBy({ country_id: id });
  }

  async updateCountry(id: number, data: Partial<Country>): Promise<Country | null> {
    const country = await this.countryRepository.findOneBy({ country_id: id });
    if (!country) {
      return null;
    }
    this.countryRepository.merge(country, data);
    const discount = await this.discountRepository.findOneBy({ discount_Id: data.discount_Id?.discount_Id });
    if (discount && data.country_discount) {
      country.country_discount_applied = Math.max(discount.discount_percentage, data.country_discount.percentage);
    } else if (discount) {
      country.country_discount_applied = discount.discount_percentage;
    } else if (data.country_discount) {
      country.country_discount_applied = data.country_discount.percentage;
    } else {
      country.country_discount_applied = 0;
    }
    return this.countryRepository.save(country);
  }

  async deleteCountry(id: number): Promise<boolean> {
    const result = await this.countryRepository.delete({ country_id: id });
    return result.affected !== 0;
  }

  async getCountryByName(name: string): Promise<Country | null> {
      return await this.countryRepository.findOneBy({ country_name: name  });
  }
}

export default new CountryService();
