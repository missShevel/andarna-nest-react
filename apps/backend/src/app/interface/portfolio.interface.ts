import { InvestmentType, PortfolioType } from '@andarna/common';

export interface ICreatePortfolio {
  name: string;
  type: PortfolioType;
  lastOpenedAt: Date;
  investmentType?: InvestmentType;
  user: string;
}

export interface IUpdatePortfolio {
  name?: string;
  type?: PortfolioType;
  investmentType?: InvestmentType;
}
