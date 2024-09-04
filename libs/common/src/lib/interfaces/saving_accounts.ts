import { Currency } from '../enum/currency';

export interface ISavingAccount {
  id: string;
  name: string;
  currency: Currency;
  goalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
