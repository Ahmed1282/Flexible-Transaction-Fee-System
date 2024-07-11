import express from 'express';
import sequelize from './config/db'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB Connection has been established successfully.');

    // // Synchronize models
    // await sequelize.sync({ force: true }); // Use force: true to drop and recreate tables
    // console.log('All models were synchronized successfully.');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
