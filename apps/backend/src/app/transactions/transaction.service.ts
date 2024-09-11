import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { Repository } from 'typeorm';
import {
  ICreateTransaction,
  IUpdateTransaction,
} from '../interface/transaction.interface';
import { PortfolioService } from '../portfolios/portfolio.service';
import { TransactionType } from '@andarna/common';
import { OutcomeCategoryService } from '../outcome_categories/outcomeCategory.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private portfolioService: PortfolioService,
    private outcomeCategoryService: OutcomeCategoryService
  ) {}

  async create(
    portfolioId: string,
    userId: string,
    transactionData: ICreateTransaction
  ): Promise<Transaction> {
    const portfolio = await this.portfolioService.findById(userId, portfolioId);
    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${portfolioId} not found`);
    }
    const amount = transactionData.initialAmount * transactionData.exchangeRate;
    const createdTransaction = new Transaction();
    const transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'> = {
      ...transactionData,
      amount,
      portfolio,
      transactionDate: new Date(transactionData.transactionDate),
      outcomeCategory: null,
    };
    console.log(transactionData);

    if (
      transactionData.type === TransactionType.OUTCOME &&
      transactionData.outcomeCategoryId
    ) {
      const verifiedCategory = await this.outcomeCategoryService.verifyCategory(
        userId,
        transactionData.outcomeCategoryId
      );
      if (!verifiedCategory) {
        throw new NotFoundException(
          `Category with ID ${transactionData.outcomeCategoryId} not found`
        );
      }
      transaction.outcomeCategory = verifiedCategory;
    }
    Object.assign(createdTransaction, transaction);

    await this.transactionRepository.save(createdTransaction);
    return createdTransaction;
  }

  async findAllByPortfolioId(portfolioId: string): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { portfolio: { id: portfolioId } },
      relations: {
        outcomeCategory: true,
      },
    });
  }

  async findOne(
    transactionId: string,
    portfolioId: string
  ): Promise<Transaction | null> {
    const transaction = await this.transactionRepository.findOne({
      where: {
        portfolio: { id: portfolioId },
        id: transactionId,
      },
      relations: {
        outcomeCategory: true,
      },
    });
    return transaction;
  }

  async deleteOne(transactionId: string, portfolioId: string): Promise<void> {
    const transactionToDelete = await this.findOne(transactionId, portfolioId);
    if (!transactionToDelete) {
      throw new NotFoundException(
        `transaction with ID ${transactionId} not found`
      );
    }
    this.transactionRepository.remove(transactionToDelete);
  }

  async editOne(
    transactionId: string,
    portfolioId: string,
    userId: string,
    transactionData: IUpdateTransaction
  ): Promise<Transaction> {
    const transactionToEdit = await this.findOne(transactionId, portfolioId);
    if (!transactionToEdit) {
      throw new NotFoundException(
        `transaction with ID ${transactionId} not found`
      );
    }
    const transactionUpdateData: Partial<Transaction> = {
      ...transactionData,
      transactionDate: new Date(
        transactionData.transactionDate || transactionToEdit.transactionDate
      ),
      outcomeCategory: transactionToEdit.outcomeCategory,
    };
    Object.assign(transactionToEdit, transactionUpdateData);
    if (transactionData.initialAmount) {
      const exchangeRate =
        transactionData.exchangeRate ?? transactionToEdit.exchangeRate;
      transactionToEdit.amount = transactionData.initialAmount * exchangeRate;
    }
    if (transactionToEdit.type !== TransactionType.OUTCOME) {
      console.log(1);

      transactionToEdit.outcomeCategory = null;
    }
    if (
      transactionToEdit.type === TransactionType.OUTCOME &&
      transactionData.outcomeCategoryId &&
      transactionToEdit.outcomeCategory?.id !==
        transactionData.outcomeCategoryId
    ) {
      const verifiedCategory = await this.outcomeCategoryService.verifyCategory(
        userId,
        transactionData.outcomeCategoryId
      );
      if (!verifiedCategory) {
        throw new NotFoundException(
          `Category with ID ${transactionData.outcomeCategoryId} not found`
        );
      }
      transactionToEdit.outcomeCategory = verifiedCategory;
    }
    return await this.transactionRepository.save(transactionToEdit);
  }
}
