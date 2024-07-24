import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from '../dto/user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { UserFromToken } from '../decorators/userFromToken.decorator copy';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
  @Get('/me')
  @UseGuards(AuthGuard)
  async getMe(@CurrentUser() currentUser: User): Promise<User> {
    return currentUser;
  }

  @Get()
  async findOrCreateUser(
    @UserFromToken() decodedUser: DecodedIdToken
  ): Promise<User> {
    return this.userService.findOrCreate(decodedUser.uid);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
}
