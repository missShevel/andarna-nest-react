import { Currency, TransactionType } from '@andarna/common';
import { TransactionCategory } from '../transactions/enum/categories';
import { OutcomeCategory } from '../outcome_categories/outcomeCategory.entity';
import { Portfolio } from '../portfolios/portfolio.entity';

export interface ICreateTransaction {
  type: TransactionType;
  amount: number;
  initialAmount: number;
  exchangeRate: number;
  currency: Currency;
  description?: string;
  transactionDate: string;
  outcomeCategory?: OutcomeCategory;
}

export interface IUpdateTransaction {
  type?: TransactionType;
  amount?: number;
  initialAmount?: number;
  exchangeRate?: number;
  currency?: Currency;
  description?: string;
  transactionDate?: string;
  outcomeCategory?: OutcomeCategory;
}
