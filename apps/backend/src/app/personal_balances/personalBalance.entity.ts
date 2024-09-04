import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Portfolio } from '../portfolios/portfolio.entity';
import { IPersonalBalance } from '@andarna/common';

@Entity('personal_balances')
export class PersonalBalance implements IPersonalBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  balance: number;

  @OneToOne(() => Portfolio, (portfolio) => portfolio.personalBalances)
  portfolio: Portfolio;

  @UpdateDateColumn()
  updatedAt: Date;
}
