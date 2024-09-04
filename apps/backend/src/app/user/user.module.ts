import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Portfolio } from '../portfolios/portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Portfolio])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
