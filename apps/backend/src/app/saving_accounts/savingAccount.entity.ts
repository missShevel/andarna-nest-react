import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Currency, ISavingAccount } from '@andarna/common';

@Entity('saving_accounts')
export class SavingAccount implements ISavingAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: Currency, default: Currency.UAH })
  currency: Currency;

  @Column({ type: 'float' })
  goalAmount: number;

  @ManyToOne(() => User, (user) => user.savingAccounts)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
