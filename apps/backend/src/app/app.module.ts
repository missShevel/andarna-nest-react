import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';
import { FirebaseApp } from './firebase/firebase-app';
import { Transaction } from './transactions/transactions.entity';
import { TransactionModule } from './transactions/transaction.module';
import { OutcomeCategoryModule } from './outcome_categories/outcomeCategory.module';
import { PersonalBalance } from './personal_balances/personalBalance.entity';
import { PersonalBalanceModule } from './personal_balances/personalBalance.module';
import { PortfolioModule } from './portfolios/portfolio.module';
import { Portfolio } from './portfolios/portfolio.entity';
import { SavingAccount } from './saving_accounts/savingAccount.entity';
import { SavingAccountModule } from './saving_accounts/savingAccount.module';
import { OutcomeCategory } from './outcome_categories/outcomeCategory.entity';
import { ExchangeNbuModule } from './exchangeNbuApi/exchangeNbu.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          User,
          Transaction,
          OutcomeCategory,
          PersonalBalance,
          Portfolio,
          SavingAccount,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    TransactionModule,
    OutcomeCategoryModule,
    PersonalBalanceModule,
    PortfolioModule,
    SavingAccountModule,
    ExchangeNbuModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseApp],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
