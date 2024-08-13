import {
  IsCurrency,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { TransactionCategory } from '../transactions/enum/types';

export class CreateTransactionDto {
  category: TransactionCategory;
  @IsOptional()
  issuer: string;
  @IsOptional()
  ticker: string;
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsNumber()
  @IsPositive()
  buyPrice: number;
  @IsString()
  currency: string;
  @IsString()
  @MaxLength(255)
  description: string;
  @IsDateString()
  transactionDate: string;
}
