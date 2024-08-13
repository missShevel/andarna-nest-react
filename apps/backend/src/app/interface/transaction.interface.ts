export interface ICreateTransaction {
  category: string;
  issuer?: string;
  ticker?: string;
  amount: number;
  buyPrice?: number;
  currency: string;
  description?: string;
  transactionDate: Date;
  userId: string;
}
