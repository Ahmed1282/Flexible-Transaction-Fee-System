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
export class Promotion {
  @PrimaryGeneratedColumn()
  promotion_id!: number;

  @Column()
  promotion_name!: string;

  @Column({ type: 'float', nullable: true })
  promotion_discount?: number;

  @Column({ type: 'float', nullable: true })
  promotion_margin?: number;

  @OneToMany(() => Billing, billing => billing.promotion)
  billings!: Billing[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default Promotion;
