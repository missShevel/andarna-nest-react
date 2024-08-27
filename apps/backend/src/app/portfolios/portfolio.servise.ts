import { Injectable } from '@nestjs/common';
import { Portfolio } from './portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private PortfolioRepository: Repository<Portfolio>
  ) {}
}
