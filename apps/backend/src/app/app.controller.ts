import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { common } from '@andarna/common';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    console.log(common());

    return this.appService.getData();
  }
}
