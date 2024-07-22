// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME as string,
//   process.env.DB_USER as string,
//   process.env.DB_PASSWORD as string,
//   {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT as any,
//     logging: console.log, // Enable logging to see SQL queries
//   }
// );

// // sequelize.authenticate();
// //     console.log('DB Connection has been established successfully.');

// export default sequelize;


import { DataSource } from 'typeorm';
import { Jurisdiction } from '../models/jurisdiction';
// import { Billing } from '../models/billing';
import { Country } from '../models/country';
import { Promotion } from '../models/promotion';
import { Discount } from '../models/discount'
import { Billing } from '../models/billing'
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Jurisdiction, Country, Promotion, Discount, Billing],
  synchronize: true,
  logging: true,
});

export default AppDataSource;
