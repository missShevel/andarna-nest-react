import {
  IsCurrency,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { TransactionCategory } from '../transactions/enum/categories';

export class CreateTransactionDto {
  @IsEnum(TransactionCategory)
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

export class UpdateTransactionDto {
  @IsEnum(TransactionCategory)
  @IsOptional()
  category: TransactionCategory;
  @IsOptional()
  issuer: string;
  @IsOptional()
  ticker: string;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount: number;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  buyPrice: number;
  @IsString()
  @IsOptional()
  currency: string;
  @IsString()
  @MaxLength(255)
  @IsOptional()
  description: string;
  @IsDateString()
  @IsOptional()
  transactionDate: string;
}
