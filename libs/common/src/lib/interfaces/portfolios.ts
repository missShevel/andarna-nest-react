import { InvestmentType, PortfolioType } from '../enum';

export interface IPortfolio {
  id: string;
  name: string;
  lastOpenedAt: Date;
  type: PortfolioType;
  investment_type?: InvestmentType;
  createdAt: Date;
  updatedAt: Date;
}
