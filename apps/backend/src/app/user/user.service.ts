import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUser } from '../interface/user.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
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

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOrCreate(firebaseId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ firebaseId });
    if (user) {
      return user;
    }
    const userFromFirebase = await getAuth().getUser(firebaseId);
    if (!userFromFirebase) {
      throw new NotFoundException(`User with ID ${firebaseId} not found`);
    }
    return this.create({
      email: userFromFirebase.email as string,
      firebaseId,
      firstName: userFromFirebase.displayName?.split(' ')[0] as string,
      lastName: userFromFirebase.displayName?.split(' ')[1] as string,
    });
  }
}
