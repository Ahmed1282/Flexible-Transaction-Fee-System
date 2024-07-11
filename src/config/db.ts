import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as 'postgres', // Ensure the dialect is of the correct type
    logging: false,
  }
);

// Export the sequelize instance to be used in models and elsewhere
export default sequelize;
