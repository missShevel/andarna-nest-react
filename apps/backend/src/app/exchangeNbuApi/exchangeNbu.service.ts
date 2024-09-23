import { Currency } from '@andarna/common';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IExchangeRate } from '../interface/exchangeRate.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExchangeNbuService {
  constructor(private readonly httpService: HttpService) {}
  async getExhangeRate(currency: Currency) {
    const { data } = await firstValueFrom(
      this.httpService.get<IExchangeRate[]>(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
      )
    );
    const finalRate = data.find((item) => item.cc === currency);
    return finalRate;
  }
}
