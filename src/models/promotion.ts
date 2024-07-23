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
import { Billing } from './billing';
@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  promotion_id!: number;
  @Column()
  promotion_name!: string;
  @Column('float')
  promotion_discount!: number;
  @OneToMany(() => Billing, billing => billing.promotion)
  billings!: Billing[];
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
export default Promotion;



