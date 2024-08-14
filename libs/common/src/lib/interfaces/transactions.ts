export enum TransactionCategory {
  BONDS = 'bonds',
  SHARES = 'shares',
  DIVIDENT = 'divident',
  CASH = 'cash',
  CRYPTO = 'crypto',
}
export interface ITransaction {
  id: string;
  category: TransactionCategory;
  issuer?: string;
  ticker?: string;
  amount: number;
  buyPrice?: number;
  currency: string;
  description?: string;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  // user: string;
}
