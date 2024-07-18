import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  @Entity()
  export class Jurisdiction {
    @PrimaryGeneratedColumn()
    id!: number;
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
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
  }