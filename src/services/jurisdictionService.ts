import AppDataSource  from '../config/db';
import { Jurisdiction } from '../models/jurisdiction';

export class JurisdictionService {
  private jurisdictionRepository = AppDataSource.getRepository(Jurisdiction);

  async getAllJurisdictions(): Promise<Jurisdiction[]> {
    return this.jurisdictionRepository.find();
  }

  async getJurisdictionById(id: number): Promise<Jurisdiction | null> {
    return this.jurisdictionRepository.findOneBy({ id });
  }

  async getJurisdictionByName(name: string): Promise<Jurisdiction | null> {
    return this.jurisdictionRepository.findOne({ where: { jurisdiction_name: name } });
  }

  async createJurisdiction(data: Partial<Jurisdiction>): Promise<Jurisdiction> {
    const newJurisdiction = this.jurisdictionRepository.create(data);
    return this.jurisdictionRepository.save(newJurisdiction);
  }

  async updateJurisdiction(id: number, data: Partial<Jurisdiction>): Promise<Jurisdiction | null> {
    const jurisdiction = await this.jurisdictionRepository.findOneBy({ id });
    if (jurisdiction) {
      this.jurisdictionRepository.merge(jurisdiction, data);
      return this.jurisdictionRepository.save(jurisdiction);
    }
    return null;
  }

  async deleteJurisdiction(id: number): Promise<boolean> {
    const result = await this.jurisdictionRepository.delete(id);
    return result.affected !== 0;
  }
}
