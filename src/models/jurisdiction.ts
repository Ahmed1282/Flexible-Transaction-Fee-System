import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Discount } from './discount';
import { Billing } from './billing';
@Entity()
export class Jurisdiction {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ unique: true })
  jurisdiction_name!: string;
  @Column('float')
  UserFeeShare!: number;
  @Column('float')
  tax!: number;
  @Column('json', { nullable: true })
  jurisdiction_discount!: { name: string; percentage: number } | null;
  @Column('float')
  buy_margin!: number;
  @Column('float')
  sell_margin!: number;
  @Column('float')
  FassetFee!: number;
  @Column('float')
  dinariConstantFee!: number;
  @Column('float')
  dinariPercentageFee!: number;
  @ManyToOne(() => Discount, { nullable: true })
  @JoinColumn({ name: 'discount_Id' })
  discount_Id!: Discount;
  @Column('float', { default: 0 })
  juris_discount_applied!: number;
  @OneToMany(() => Billing, billing => billing.jurisdiction)
  billings!: Billing[];
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}



