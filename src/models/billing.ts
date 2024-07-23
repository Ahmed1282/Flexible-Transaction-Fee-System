import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Country } from './country';
import { Jurisdiction } from './jurisdiction';
import { Promotion } from './promotion';
import { Discount } from './discount';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  billing_id!: number;

  @Column()
  user_id!: number;  // this will come from the API

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country!: Country | null;

  @ManyToOne(() => Jurisdiction, { nullable: true })
  @JoinColumn({ name: 'jurisdictions_id' })
  jurisdiction!: Jurisdiction | null;

  @ManyToOne(() => Promotion, { nullable: true })
  @JoinColumn({ name: 'promotion_id' })
  promotion!: Promotion | null;

  @ManyToOne(() => Discount, { nullable: true })
  @JoinColumn({ name: 'discount_id' })
  discount!: Discount | null;

  @Column('float')
  billing_fee!: number;

  @Column()
  event_type!: string;  // will be 'buy' or 'sell' from the URL
}