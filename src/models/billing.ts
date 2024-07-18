import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country';
import { Jurisdiction } from './jurisdiction';
import { Promotion } from './promotion';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  billing_id!: number;

  @Column()
  user_id!: number;  // this will come from the API

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country!: Country;

  @ManyToOne(() => Jurisdiction)
  @JoinColumn({ name: 'jurisdictions_id' })
  jurisdiction!: Jurisdiction;

  @ManyToOne(() => Promotion, { nullable: true })
  @JoinColumn({ name: 'promotion_id' })
  promotion!: Promotion | null;

  @Column('float')
  billing_fee!: number;

  @Column()
  event_type!: string;  // will be 'buy' or 'sell' from the URL
}