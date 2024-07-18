import { Repository } from 'typeorm';
import AppDataSource from '../config/db';
import Country from '../models/country';

class CountryService {
  private countryRepository: Repository<Country>;

  constructor() {
    this.countryRepository = AppDataSource.getRepository(Country);
  }

  async createCountry(data: Partial<Country>): Promise<Country> {
    const country = this.countryRepository.create(data);
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
