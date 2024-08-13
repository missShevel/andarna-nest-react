import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ITransaction } from '@andarna/common';
import { User } from '../user/user.entity';
import { TransactionCategory } from './enum/types';

@Entity('transactions')
export class Transaction implements ITransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TransactionCategory,
    default: TransactionCategory.CASH,
  })
  //   @ManyToOne(() => Category, category => category.transactions)
  category: TransactionCategory;
  @Column({ nullable: true })
  issuer: string;
  @Column({ nullable: true })
  ticker: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  buyPrice: number;

  @Column({ type: 'varchar', length: 10 })
  currency: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  transactionDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.transactions, { nullable: false })
  @JoinColumn({ name: 'userId' })
  userId: string;
}
