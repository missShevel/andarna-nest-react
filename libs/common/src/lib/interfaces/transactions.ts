import { Currency } from '../enum/currency';

export enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
  SAVINGS = 'savings',
  INVESTMENT = 'investment',
}
export interface ITransaction {
  id: string;
  type: TransactionType;
  initialAmount: number;
  currency: Currency;
  exchangeRate: number;
  description?: string;
  transactionDate: Date;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
