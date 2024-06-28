import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class USerController {
  constructor(private userService: UserService) {}

  //   @Post()
  //   async create(@Body() createUserDto: CreateUserDto):
}
