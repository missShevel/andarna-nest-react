import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingAccount } from './savingAccount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavingAccount])],
})
export class SavingAccountModule {}
