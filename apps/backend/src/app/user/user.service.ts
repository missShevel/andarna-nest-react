import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUser } from '../interface/user.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';
import { Portfolio } from '../portfolios/portfolio.entity';
import { PortfolioType } from '@andarna/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Portfolio)
    private dataSource: DataSource
  ) {}

  async createUserWithPortfolio(user: ICreateUser): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const createdUser = new User();
    const createdPortfolio = new Portfolio();
    try {
      Object.assign(createdUser, user);
      Object.assign(createdPortfolio, {
        name: 'Personal Portfolio',
        lastOpenedAt: new Date(),
        type: PortfolioType.PERSONAL,
        user: createdUser,
      });

      await queryRunner.manager.save(createdUser);
      await queryRunner.manager.save(createdPortfolio);
      console.log('create user with portfolio');

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
    return this.createUserWithPortfolio({
      email: userFromFirebase.email as string,
      firebaseId,
      firstName: userFromFirebase.displayName?.split(' ')[0] as string,
      lastName: userFromFirebase.displayName?.split(' ')[1] as string,
    });
  }
}
