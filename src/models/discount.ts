import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Billing } from './billing';
@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  discount_Id!: number;
  @Column()
  discount_code!: string;
  @Column({ default: false })
  discount_applicable_jurisdiction!: boolean;
  @Column({ default: false })
  discount_applicable_country!: boolean;
  @Column({ default: false })
  discount_applicable_promotion!: boolean;
  @Column('float')
  discount_percentage!: number;
  @Column('json', { nullable: true })
  codeusedby!: number[];
  @OneToMany(() => Billing, billing => billing.discount)
billings!: Billing[];
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}