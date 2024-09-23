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
import { UserPortfolioGuard } from '../auth/guards/userPortfolio.guard';

@Controller('/portfolio/:portfolioId/transaction')
@UseGuards(AuthGuard, UserPortfolioGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async createTransaction(
    @CurrentUser() user: User,
    @Param('portfolioId') portfolioId: string,
    @Body() createTransactionDto: CreateTransactionDto
  ): Promise<Transaction> {
    return this.transactionService.create(
      portfolioId,
      user.id,
      createTransactionDto
    );
  }

  @Get()
  async findAllTransactionsByPortfolioId(
    @Param('portfolioId') portfolioId: string
  ): Promise<Transaction[]> {
    return this.transactionService.findAllByPortfolioId(portfolioId);
  }

  @Get(':transactionId')
  async findOneTransactionById(
    @Param('portfolioId') portfolioId: string,
    @Param('transactionId') transactionId: string
  ): Promise<Transaction> {
    const transaction = await this.transactionService.findOne(
      transactionId,
      portfolioId
    );
    if (!transaction) {
      throw new NotFoundException(
        `Transaction with ID ${transactionId} not found for Portfolio ${portfolioId}`
      );
    }
    return transaction;
  }
  @Delete(':transactionId')
  async deleteTransaction(
    @Param('portfolioId') portfolioId: string,
    @Param('transactionId') transactionId: string
  ): Promise<void> {
    this.transactionService.deleteOne(transactionId, portfolioId);
  }

  @Put(':transactionId')
  async editTransaction(
    @CurrentUser() user: User,
    @Param('portfolioId') portfolioId: string,
    @Param('transactionId') transactionId: string,
    @Body() updatedData: UpdateTransactionDto
  ): Promise<Transaction> {
    return this.transactionService.editOne(
      transactionId,
      portfolioId,
      user.id,
      updatedData
    );
  }
}
