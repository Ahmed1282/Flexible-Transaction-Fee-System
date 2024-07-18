import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  
  @Entity()
  export class Promotion {
    @PrimaryGeneratedColumn()
    promotion_id!: number;
  
    @Column('json')
    promotion_type!: object;
  
    @Column('float')
    promotion_discount!: number;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }
  