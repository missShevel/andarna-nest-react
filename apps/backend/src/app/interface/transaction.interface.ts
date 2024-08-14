import { TransactionCategory } from '../transactions/enum/categories';

export interface ICreateTransaction {
  category: TransactionCategory;
  issuer?: string;
  ticker?: string;
  amount: number;
  buyPrice?: number;
  currency: string;
  description?: string;
  transactionDate: string;
  user: string;
}

export interface IUpdateTransaction {
  category?: TransactionCategory;
  issuer?: string;
  ticker?: string;
  amount?: number;
  buyPrice?: number;
  currency: string;
  description?: string;
  transactionDate?: string;
}
