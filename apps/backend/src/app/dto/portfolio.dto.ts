import { InvestmentType, PortfolioType } from '@andarna/common';
import { IsEnum, IsOptional, MaxLength } from 'class-validator';

export class CreatePortfolioDto {
  @MaxLength(255)
  name: string;
  @IsEnum(PortfolioType)
  type: PortfolioType;
  @IsEnum(InvestmentType)
  @IsOptional()
  investmentType: InvestmentType;
}

export class UpdatePortfolioDto {
  @MaxLength(255)
  @IsOptional()
  name: string;
  @IsEnum(PortfolioType)
  @IsOptional()
  type: PortfolioType;
  @IsEnum(InvestmentType)
  @IsOptional()
  investmentType: InvestmentType;
}
