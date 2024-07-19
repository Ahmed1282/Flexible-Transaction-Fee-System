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
export class Promotion {
  @PrimaryGeneratedColumn()
  promotion_id!: number;

  @Column('json')
  promotion_type!: object;

  @Column('float')
  promotion_discount!: number;

  @ManyToOne(() => Discount, { nullable: true })
  @JoinColumn({ name: 'discount_Id' })
  discount_Id!: Discount;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default Promotion;
