import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  
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
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }
  