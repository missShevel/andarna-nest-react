import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { OutcomeCategory } from '../../outcome_categories/outcomeCategory.entity';

export class DefaultCategories1725455467038 implements Seeder {
  track = true;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const categories = [
      {
        id: '96e55923-6f22-4204-81f8-96d07b3e38e8',
        name: 'Food',
        color: '#66478d',
      },
      {
        id: 'b7e02e8c-5186-41cb-a289-04f5e5e9b8de',
        name: 'Transportation',
        color: '#ff5733',
      },
      {
        id: 'c8f07fcb-2339-4b8b-9551-efb4c5e10adf',
        name: 'Healthcare',
        color: '#28a745',
      },
      {
        id: '3b294f9b-f35a-44f7-9e59-d0d547fba2fb',
        name: 'Entertainment',
        color: '#ffc107',
      },
      {
        id: '7d417497-30da-445b-b1d7-6671d61c6e1f',
        name: 'Education',
        color: '#6f42c1',
      },
      {
        id: '1f223c6f-7c48-4dbe-839b-f7ae0f3e2e94',
        name: 'Utilities',
        color: '#17a2b8',
      },
      {
        id: '8297ad84-1c56-44a6-b752-c5e8b2fdaadc',
        name: 'Shopping',
        color: '#e83e8c',
      },
      {
        id: '5f1b48b3-1b98-45e1-a7a5-ef0aab4fd6b8',
        name: 'Personal Care',
        color: '#fd7e14',
      },
      {
        id: '2db57f74-3720-4321-b87a-999e9bfa77a4',
        name: 'Travel',
        color: '#20c997',
      },
      {
        id: 'a9c7932e-55a6-47eb-98d8-98ecf1530e28',
        name: 'Housing',
        color: '#007bff',
      },
    ];
    const entities = categories.map((category) => {
      const entity = new OutcomeCategory();
      Object.assign(entity, category);
      return entity;
    });

    await dataSource.manager.save(entities);
  }
}
