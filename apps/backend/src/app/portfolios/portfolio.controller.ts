import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PortfolioService } from './portfolio.servise';

@Controller('portfolio')
@UseGuards(AuthGuard)
export class PortfolioController {
  constructor(private transactionService: PortfolioService) {}
}
