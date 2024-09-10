import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OutcomeCategoryService } from './outcomneCategory.service';
import { OutcomeCategory } from './outcomeCategory.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { User } from '../user/user.entity';
import {
  CreateOutcomeCategoryDto,
  UpdateOutcomeCategoryDto,
} from '../dto/outcomeCategories.dto';

@Controller('outcome-categories')
@UseGuards(AuthGuard)
export class OutcomeCategoryController {
  constructor(
    private readonly outcomeCategoryService: OutcomeCategoryService
  ) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<OutcomeCategory[]> {
    return this.outcomeCategoryService.findAll(user.id);
  }

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createOutcomeCategoryDto: CreateOutcomeCategoryDto
  ): Promise<OutcomeCategory> {
    return this.outcomeCategoryService.create(user, createOutcomeCategoryDto);
  }

  @Put(':id')
  async update(
    @Param('id') outcomeCategoryId: string,
    @CurrentUser() user: User,
    @Body() updateOutcomeCategoryDto: UpdateOutcomeCategoryDto
  ): Promise<OutcomeCategory> {
    return this.outcomeCategoryService.update(
      outcomeCategoryId,
      user.id,
      updateOutcomeCategoryDto
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') outcomeCategoryId: string,
    @CurrentUser() user: User
  ): Promise<void> {
    return this.outcomeCategoryService.remove(outcomeCategoryId, user.id);
  }
}
