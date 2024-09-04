import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ExtendedRequest } from '../../interface/user.interface';
import { PortfolioService } from '../../portfolios/portfolio.service';

@Injectable()
export class UserPortfolioGuard implements CanActivate {
  constructor(private portfolioService: PortfolioService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ExtendedRequest = context.switchToHttp().getRequest();
    const userId = request.user!.id;
    const portfolioId = request.params.portfolioId;
    const portfolio = await this.portfolioService.findById(userId, portfolioId);
    if (!portfolio) {
      return false;
    }
    return true;
  }
}
