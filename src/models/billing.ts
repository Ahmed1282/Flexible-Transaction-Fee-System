import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country';
import { Jurisdiction } from './jurisdiction';
import { Promotion } from './promotion';
import { Discount } from './discount';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  billing_id!: number;

  @Column()
  user_id!: number;

  @Column({ nullable: true })
  country_id?: number;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country?: Country | null;

  @Column({ nullable: false })
  jurisdiction_id?: number;

  @ManyToOne(() => Jurisdiction, { nullable: true })
  @JoinColumn({ name: 'jurisdiction_id' })
  jurisdiction?: Jurisdiction | null;

  @Column({ nullable: true })
  promotion_id?: number;

  @ManyToOne(() => Promotion, { nullable: true })
  @JoinColumn({ name: 'promotion_id' })
  promotion?: Promotion | null;

  @Column({ nullable: true })
  discount_id?: number;

  @ManyToOne(() => Discount, { nullable: true })
  @JoinColumn({ name: 'discount_id' })
  discount?: Discount | null;

  @Column('float')
  billing_fee!: number;

  @Column()
  event_type!: string;

  @Column('float', { nullable: true })
  applied_discount?: number;

  @Column('float', { nullable: true })
  applied_margin?: number;
}
