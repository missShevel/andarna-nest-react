import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Currency, TransactionType } from '@andarna/common';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  type: TransactionType;
  @IsNumber()
  @IsPositive()
  initialAmount: number;
  @IsNumber()
  @IsPositive()
  exchangeRate: number;
  @IsEnum(Currency)
  currency: Currency;
  @IsString()
  @MaxLength(255)
  @IsOptional()
  description: string;
  @IsDateString()
  transactionDate: string;
  @IsUUID()
  @IsOptional()
  outcomeCategoryId: string;
}

export class UpdateTransactionDto {
  @IsEnum(TransactionType)
  @IsOptional()
  type: TransactionType;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  initialAmount: number;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  exchangeRate: number;
  @IsEnum(Currency)
  @IsOptional()
  currency: Currency;
  @IsString()
  @MaxLength(255)
  @IsOptional()
  description: string;
  @IsDateString()
  @IsOptional()
  transactionDate: string;
  @IsUUID()
  @IsOptional()
  outcomeCategoryId: string;
}
