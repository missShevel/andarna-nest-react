import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  In,
  OneToOne,
} from 'typeorm';
import { InvestmentType, IPortfolio, PortfolioType } from '@andarna/common';
import { User } from '../user/user.entity';
import { Transaction } from '../transactions/transactions.entity';
import { PersonalBalance } from '../personal_balances/personalBalance.entity';
import { IsOptional } from 'class-validator';

@Entity('portfolios')
export class Portfolio implements IPortfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'timestamp' })
  lastOpenedAt: Date;

  @Column({
    type: 'enum',
    enum: PortfolioType,
    default: PortfolioType.PERSONAL,
  })
  type: PortfolioType;

  @Column({
    type: 'enum',
    enum: InvestmentType,
    default: InvestmentType.CRYPTO,
    nullable: true,
  })
  @IsOptional()
  investmentType: InvestmentType; // Could be enum type if needed

  @ManyToOne(() => User, (user) => user.portfolios, { nullable: false })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.portfolio)
  transactions: Transaction[];

  @OneToOne(
    () => PersonalBalance,
    (personalBalance) => personalBalance.portfolio
  )
  personalBalances: PersonalBalance;
}
