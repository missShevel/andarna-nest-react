import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from '../user/user.entity';
import { Transaction } from '../transactions/transactions.entity';
import { OutcomeCategory } from '../outcome_categories/outcomeCategory.entity';
import { PersonalBalance } from '../personal_balances/personalBalance.entity';
import { Portfolio } from '../portfolios/portfolio.entity';
import { SavingAccount } from '../saving_accounts/savingAccount.entity';
import { resolve } from 'path';
import { DefaultCategories1725455467038 } from './seeds/1725455467038-defaultCategories';

const seedFolder = resolve(__dirname, 'seeds');
console.log(process.env.DATABASE_PASSWORD);

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    User,
    Transaction,
    OutcomeCategory,
    PersonalBalance,
    Portfolio,
    SavingAccount,
  ],
  seedTableName: 'seeds',
  seeds: [DefaultCategories1725455467038],
  seedTracking: true,
};

export const dataSource = new DataSource(options);
