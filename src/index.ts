import express from 'express';
import sequelize from './config/db';
import Country from './models/country'; // Ensure the path is correct
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

    // Explicitly synchronize the Country model
    await Country.sync({ force: true, logging: console.log });
    console.log('Country model synchronized successfully.');

    // Synchronize all models
    await sequelize.sync({ force: true, logging: console.log }); // Enable logging to see SQL queries
    console.log('All models were synchronized successfully.');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

