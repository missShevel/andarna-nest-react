export interface ITransaction {
  id: string;
  category: string;
  issuer?: string;
  ticker?: string;
  amount: number;
  buyPrice?: number;
  currency: string;
  description?: string;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
