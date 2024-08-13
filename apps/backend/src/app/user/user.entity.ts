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

  @OneToMany(() => Transaction, (transaction) => transaction.user.id)
  transactions: Transaction[];
}
