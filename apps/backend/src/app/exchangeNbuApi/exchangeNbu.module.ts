import { Module } from '@nestjs/common';
import { ExchangeNbuService } from './exchangeNbu.service';
import { HttpModule } from '@nestjs/axios';
import { ExchangeNbuController } from './exchangeNbu.controller';

@Module({
  imports: [HttpModule],
  controllers: [ExchangeNbuController],
  providers: [ExchangeNbuService],
})
export class ExchangeNbuModule {}
