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
import { AuthGuard } from '../auth/guards/auth.guard';
import { PortfolioService } from './portfolio.service';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { CreatePortfolioDto, UpdatePortfolioDto } from '../dto/portfolio.dto';
import { Portfolio } from './portfolio.entity';
import { User } from '../user/user.entity';

@Controller('portfolio')
@UseGuards(AuthGuard)
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createPortfolioDto: CreatePortfolioDto
  ): Promise<Portfolio> {
    const userId = user.id;
    return this.portfolioService.create({
      ...createPortfolioDto,
      lastOpenedAt: new Date(),
      user: userId,
    });
  }

  @Get()
  async findAllByUserId(@CurrentUser() user: User): Promise<Portfolio[]> {
    return this.portfolioService.findAllByUserId(user.id);
  }

  @Get(':id')
  async findById(
    @CurrentUser() user: User,
    @Param('id') id: string
  ): Promise<Portfolio | null> {
    const transaction = this.portfolioService.findById(user.id, id);
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
    this.portfolioService.deleteOne(user.id, id);
  }

  @Put(':id')
  async editOne(
    @CurrentUser() user: User,
    @Param('id') portfolioId: string,
    @Body() updatedData: UpdatePortfolioDto
  ): Promise<Portfolio> {
    return this.portfolioService.editOne(user.id, portfolioId, updatedData);
  }
}
