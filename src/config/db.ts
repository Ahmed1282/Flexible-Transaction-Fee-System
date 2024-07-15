import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as any,
    logging: console.log, // Enable logging to see SQL queries
  }
);

// sequelize.authenticate();
//     console.log('DB Connection has been established successfully.');

export default sequelize;
