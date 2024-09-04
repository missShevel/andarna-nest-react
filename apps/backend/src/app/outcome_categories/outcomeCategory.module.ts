import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutcomeCategory } from './outcomeCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OutcomeCategory])],
})
export class OutcomeCategoryModule {}
