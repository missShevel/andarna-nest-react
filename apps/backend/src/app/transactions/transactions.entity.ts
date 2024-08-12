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

@Entity('transactions')
export class Transaction implements ITransaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  //   @ManyToOne(() => Category, category => category.transactions)
  type: string;
  @Column()
  issuer: string;
  @Column()
  ticker: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  buyPrice: number;

  @Column({ type: 'varchar', length: 10 })
  currency: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'timestamp' })
  transactionDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  userId: string;
}
