import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  promotion_id!: number;

  @Column()
  promotion_name!: string;

  @Column('float')
  promotion_discount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default Promotion;
