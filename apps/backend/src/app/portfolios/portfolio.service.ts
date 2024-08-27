import { Injectable } from '@nestjs/common';
import { Portfolio } from './portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreatePortfolio } from '../interface/portfolio.interface';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>
  ) {}

  async create(portfolio: ICreatePortfolio): Promise<Portfolio> {
    const createdPortfolio = new Portfolio();
    Object.assign(createdPortfolio, portfolio);
    await this.portfolioRepository.save(createdPortfolio);
    return createdPortfolio;
  }
}
