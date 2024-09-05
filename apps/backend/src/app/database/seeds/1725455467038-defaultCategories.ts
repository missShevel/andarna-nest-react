import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { OutcomeCategory } from '../../outcome_categories/outcomeCategory.entity';

export class DefaultCategories1725455467038 implements Seeder {
  track = true;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const category = new OutcomeCategory();
    Object.assign(category, {
      id: '96e55923-6f22-4204-81f8-96d07b3e38e8',
      name: 'food',
      color: '#66478d',
    });
    await dataSource.manager.save(category);
  }
}
