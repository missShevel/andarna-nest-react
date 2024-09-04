import { IUser } from '@andarna/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from '../transactions/transactions.entity';
import { OutcomeCategory } from '../outcome_categories/outcomeCategory.entity';
import { SavingAccount } from '../saving_accounts/savingAccount.entity';
import { Portfolio } from '../portfolios/portfolio.entity';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  firebaseId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OutcomeCategory, (category) => category.user)
  categories: OutcomeCategory[];

  @OneToMany(() => SavingAccount, (savingAccount) => savingAccount.user)
  savingAccounts: SavingAccount[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolios: Portfolio[];
}
