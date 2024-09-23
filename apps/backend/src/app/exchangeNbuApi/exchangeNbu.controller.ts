import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ExchangeNbuService } from './exchangeNbu.service';
import { Currency } from '@andarna/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller('exchange-rate')
export class ExchangeNbuController {
  constructor(
    private exchangeNbuService: ExchangeNbuService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  @Get(':currency')
  async getExchangeRate(@Param('currency') currency: Currency) {
    const existingCurrencyRate = await this.cacheManager.get(
      `exchange-rate/${currency}`
    );
    if (existingCurrencyRate) {
      return existingCurrencyRate;
    }
    const exhcangeRate = await this.exchangeNbuService.getExhangeRate(currency);
    if (!exhcangeRate) {
      throw new NotFoundException();
    }
    await this.cacheManager.set(
      `exchange-rate/${currency}`,
      exhcangeRate.rate,
      5 * 60
    );
    return exhcangeRate.rate;
  }
}
