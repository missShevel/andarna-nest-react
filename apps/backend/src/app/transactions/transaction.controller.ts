import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from '../dto/transaction.dto';
import { Transaction } from './transactions.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { TransactionService } from './transaction.service';
import { User } from '../user/user.entity';
import { CurrentUser } from '../decorators/currentUser.decorator';
import {
  ICreateTransaction,
  IUpdateTransaction,
} from '../interface/transaction.interface';

@Controller('transaction')
@UseGuards(AuthGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createTransactionDto: CreateTransactionDto
  ): Promise<Transaction> {
    const userId = user.id;
    return this.transactionService.create({
      ...createTransactionDto,
      user: userId,
    });
  }

  @Get()
  async findAllByUserId(@CurrentUser() user: User): Promise<Transaction[]> {
    return this.transactionService.findAllByUserId(user.id);
  }

  @Get(':id')
  async findById(
    @CurrentUser() user: User,
    @Param('id') id: string
  ): Promise<Transaction | null> {
    const transaction = this.transactionService.findById(user.id, id);
    if (!transaction) {
      throw new NotFoundException(`transaction with ID ${id} not found`);
    }
    return transaction;
  }
  @Delete(':id')
  async deleteOne(
    @CurrentUser() user: User,
    @Param('id') id: string
  ): Promise<void> {
    this.transactionService.deleteOne(user.id, id);
  }

  @Put(':id')
  async editOne(
    @CurrentUser() user: User,
    @Param('id') transactionId: string,
    @Body() updatedData: UpdateTransactionDto
  ): Promise<Transaction> {
    return this.transactionService.editOne(user.id, transactionId, updatedData);
  }
}
