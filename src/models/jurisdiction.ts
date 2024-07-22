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
  export class Jurisdiction {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    jurisdiction_name!: string;
  
    @Column('float')
    UserFeeShare!: number;
  
    @Column('float')
    tax!: number;
  
    @Column('json')
    discount!: object;
  
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
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }
  