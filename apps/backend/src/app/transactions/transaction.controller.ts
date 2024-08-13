import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/transaction.dto';
import { Transaction } from './transactions.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { TransactionService } from './transaction.service';
import { User } from '../user/user.entity';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { ICreateTransaction } from '../interface/transaction.interface';

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
}
