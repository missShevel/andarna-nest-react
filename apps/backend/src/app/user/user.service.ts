import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUser } from '../interface/user.interface';
import { BadRequestException } from '@nestjs/common';

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(user: ICreateUser): Promise<User> {
    const createdUser = new User();
    const userFromDb = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (userFromDb) {
      throw new BadRequestException(
        `User with email ${user.email} already exists`
      );
    }
    Object.assign(createdUser, user);
    await this.userRepository.save(createdUser);
    return createdUser;
  }
}