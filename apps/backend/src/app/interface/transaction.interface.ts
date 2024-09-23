import { Currency, TransactionType } from '@andarna/common';
import { OutcomeCategory } from '../outcome_categories/outcomeCategory.entity';

export interface ICreateTransaction {
  type: TransactionType;
  initialAmount: number;
  exchangeRate: number;
  currency: Currency;
  description?: string;
  transactionDate: string;
  outcomeCategoryId?: string;
}

export interface IUpdateTransaction {
  type?: TransactionType;
  initialAmount?: number;
  exchangeRate?: number;
  currency?: Currency;
  description?: string;
  transactionDate?: string;
  outcomeCategoryId?: string;
}
