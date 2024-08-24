import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalBalance } from './personalBalance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalBalance])],
})
export class PersonalBalanceModule {}
