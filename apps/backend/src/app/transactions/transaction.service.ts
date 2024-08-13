import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { Repository } from 'typeorm';
import { ICreateTransaction } from '../interface/transaction.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>
  ) {}

  async create(transaction: ICreateTransaction): Promise<Transaction> {
    const createdTransaction = new Transaction();
    Object.assign(createdTransaction, transaction);
    await this.transactionRepository.save(createdTransaction);
    return createdTransaction;
  }
}
