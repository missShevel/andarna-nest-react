import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { Repository } from 'typeorm';
import {
  ICreateTransaction,
  IUpdateTransaction,
} from '../interface/transaction.interface';

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

  // async findAllByUserId(userId: string): Promise<Transaction[]> {
  //   // return this.transactionRepository.find({
  //   //   where: { user: { id: userId } },
  //   // });
  // }

  // async findById(
  //   userId: string,
  //   transactionId: string
  // ): Promise<Transaction | null> {
  //   const transaction = await this.transactionRepository.findOneBy({
  //     user: { id: userId },
  //     id: transactionId,
  //   });
  //   return transaction;
  // }

  // async deleteOne(userId: string, transactionId: string): Promise<void> {
  //   const transactionToDelete = await this.findById(userId, transactionId);
  //   if (!transactionToDelete) {
  //     throw new NotFoundException(
  //       `transaction with ID ${transactionId} not found`
  //     );
  //   }
  //   this.transactionRepository.remove(transactionToDelete);
  // }

  // async editOne(
  //   userId: string,
  //   transactionId: string,
  //   updateData: IUpdateTransaction
  // ): Promise<Transaction> {
  //   const transactionToEdit = await this.findById(userId, transactionId);
  //   if (!transactionToEdit) {
  //     throw new NotFoundException(
  //       `transaction with ID ${transactionId} not found`
  //     );
  //   }
  //   Object.assign(transactionToEdit, updateData);
  //   await this.transactionRepository.save(transactionToEdit);
  //   return transactionToEdit;
  // }
}
