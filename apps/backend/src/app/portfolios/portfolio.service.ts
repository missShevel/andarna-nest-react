import { Injectable, NotFoundException } from '@nestjs/common';
import { Portfolio } from './portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ICreatePortfolio,
  IUpdatePortfolio,
} from '../interface/portfolio.interface';

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

  async findAllByUserId(userId: string): Promise<Portfolio[]> {
    return this.portfolioRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findById(
    userId: string,
    portfolioId: string
  ): Promise<Portfolio | null> {
    const portfolio = await this.portfolioRepository.findOneBy({
      user: { id: userId },
      id: portfolioId,
    });
    if (!portfolio) {
      throw new NotFoundException(`portfolio with ID ${portfolioId} not found`);
    }
    portfolio.lastOpenedAt = new Date();
    await this.portfolioRepository.save(portfolio);
    return portfolio;
  }

  async deleteOne(userId: string, portfolioId: string): Promise<void> {
    const portfolioToDelete = await this.findById(userId, portfolioId);
    if (!portfolioToDelete) {
      throw new NotFoundException(`portfolio with ID ${portfolioId} not found`);
    }
    this.portfolioRepository.remove(portfolioToDelete);
  }

  async editOne(
    userId: string,
    portfolioId: string,
    updateData: IUpdatePortfolio
  ): Promise<Portfolio> {
    const portfolioToEdit = await this.findById(userId, portfolioId);
    if (!portfolioToEdit) {
      throw new NotFoundException(`portfolio with ID ${portfolioId} not found`);
    }
    Object.assign(portfolioToEdit, updateData);
    portfolioToEdit.lastOpenedAt = new Date();
    await this.portfolioRepository.save(portfolioToEdit);
    return portfolioToEdit;
  }
}
