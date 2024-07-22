import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Discount } from './discount';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  country_id!: number;

  @Column()
  country_name!: string;

  @Column('float')
  country_UserFeeShare!: number;

  @Column('float')
  country_tax!: number;

  @Column('json', { nullable: true })
  country_discount!: object;

  @Column('float')
  country_buy_margin!: number;

  @Column('float')
  country_sell_margin!: number;

  @Column('float')
  country_FassetFee!: number;

  @Column('float')
  country_dinariConstantFee!: number;

  @Column('float')
  country_dinariPercentageFee!: number;

  @ManyToOne(() => Discount, { nullable: true })
  @JoinColumn({ name: 'discount_Id' })
  discount_Id!: Discount;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default Country;
