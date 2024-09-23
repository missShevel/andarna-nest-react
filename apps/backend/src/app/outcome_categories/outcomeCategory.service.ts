import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { OutcomeCategory } from './outcomeCategory.entity';
import { User } from '../user/user.entity';
import {
  ICreateOutcomeCategory,
  IUpdateOutcomeCategory,
} from '../interface/outcomeCategory.interface';

@Injectable()
export class OutcomeCategoryService {
  constructor(
    @InjectRepository(OutcomeCategory)
    private readonly outcomeCategoryRepository: Repository<OutcomeCategory>
  ) {}

  async findStandardCategories(): Promise<OutcomeCategory[]> {
    return await this.outcomeCategoryRepository.find({
      where: { user: IsNull() },
    });
  }

  async findAll(userId: string): Promise<OutcomeCategory[]> {
    const customCategories = await this.outcomeCategoryRepository.find({
      where: [{ user: { id: userId } }, { user: IsNull() }],
    });
    // const standardCategories = await this.findStandardCategories();
    return customCategories;
  }

  async verifyCategory(
    userId: string,
    categoryId: string
  ): Promise<OutcomeCategory | null> {
    const verifiedCategory = await this.outcomeCategoryRepository.findOne({
      where: [
        { user: { id: userId }, id: categoryId },
        { user: IsNull(), id: categoryId },
      ],
    });
    return verifiedCategory;
  }

  async findOne(id: string, userId: string): Promise<OutcomeCategory | null> {
    const outcomeCategory = await this.outcomeCategoryRepository.findOne({
      where: { id, user: { id: userId } },
    });
    return outcomeCategory;
  }

  async create(
    user: User,
    outcomeCategoryData: ICreateOutcomeCategory
  ): Promise<OutcomeCategory> {
    const outcomeCategory = new OutcomeCategory();
    outcomeCategory.user = user;
    Object.assign(outcomeCategory, outcomeCategoryData);
    return await this.outcomeCategoryRepository.save(outcomeCategory);
  }

  async update(
    id: string,
    userId: string,
    updateOutcomeCategoryData: IUpdateOutcomeCategory
  ): Promise<OutcomeCategory> {
    const categoryToUpdate = await this.findOne(id, userId);
    if (!categoryToUpdate) {
      throw new NotFoundException(`category with ID ${id} not found`);
    }
    Object.assign(categoryToUpdate, updateOutcomeCategoryData);
    return await this.outcomeCategoryRepository.save(categoryToUpdate);
  }

  async remove(id: string, userId: string): Promise<void> {
    const categoryToDelete = await this.findOne(id, userId);
    if (!categoryToDelete) {
      throw new NotFoundException(`category with ID ${id} not found`);
    }
    await this.outcomeCategoryRepository.remove(categoryToDelete);
  }
}
