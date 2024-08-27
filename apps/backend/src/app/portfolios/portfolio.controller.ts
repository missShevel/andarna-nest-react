import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PortfolioService } from './portfolio.service';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { CreatePortfolioDto } from '../dto/portfolio.dto';
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
}
