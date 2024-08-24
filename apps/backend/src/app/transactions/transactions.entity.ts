import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Currency, ITransaction, TransactionType } from '@andarna/common';
import { User } from '../user/user.entity';
import { Portfolio } from '../portfolios/portfolio.entity';
import { Category } from '../outcome_categories/category.entity';

@Entity('transactions')
export class Transaction implements ITransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.INCOME,
  })
  type: TransactionType;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'decimal' })
  initialAmount: number;

  @Column({ type: 'float' })
  exchangeRate: number;

  @Column({ type: 'enum', enum: Currency, default: Currency.UAH })
  currency: Currency;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  transactionDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.transactions)
  portfolio: Portfolio;

  @ManyToOne(() => Category, { nullable: true })
  category: Category;
}
