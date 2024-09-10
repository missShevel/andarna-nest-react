import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutcomeCategory } from './outcomeCategory.entity';
import { OutcomeCategoryController } from './outcomeCategory.controller';
import { OutcomeCategoryService } from './outcomneCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([OutcomeCategory])],
  controllers: [OutcomeCategoryController],
  providers: [OutcomeCategoryService],
})
export class OutcomeCategoryModule {}
