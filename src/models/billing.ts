import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  billing_id: number;

  @Column()
  user_id: number;

  @Column()
  country_id: number;

  @Column()
  jurisdictions_id: number;

  @Column({ nullable: true })
  promotion_id: number;

  @Column('float')
  billing_fee: number;

  @Column()
  event_type: string;
}
