import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PortfolioModule } from '../portfolios/portfolio.module';
import { OutcomeCategoryModule } from '../outcome_categories/outcomeCategory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    PortfolioModule,
    OutcomeCategoryModule,
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
