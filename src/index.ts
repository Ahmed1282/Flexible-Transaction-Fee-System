import 'reflect-metadata';
import express from 'express';
import AppDataSource from './config/db';
import {Country} from './models/country'; 
import {Promotion} from './models/promotion'; 
import { Jurisdiction } from './models/jurisdiction';// Ensure the path is correct
import countryRoutes from './routes/countryRoute';
import jurisdictionRoutes from './routes/jurisdictionRoutes';
import promotionRoutes from './routes/promotionRoute';
import discountRoutes from './routes/discountRoutes'
import dotenv from 'dotenv';
// import Jurisdiction from './models/jurisdiction';

// Load environment variables from .env file
dotenv.config();

console.log('Environment Variables:');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_DIALECT:', process.env.DB_DIALECT);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    console.log('DB Connection has been established successfully.');

    // Synchronize models
    await AppDataSource.synchronize();
    console.log('All models were synchronized successfully.');

    app.use('/jurisdictions', jurisdictionRoutes);
    app.use('/country', countryRoutes);
    app.use('/promotions', promotionRoutes);
    app.use('/discounts', discountRoutes)

    app.get('/', (req, res) => {
      res.send('Hello, World!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('Unable to connect to the database:', error));

// app.get('/api', async (req, res) => {
//   const result = await Jurisdictions.create({UserFeeShare: 100 , tax: 2,
//     discount: 123,
//     buy_margin: 123,
//     sell_margin: 123,
//     FassetFee: 123,
//     dinariConstantFee: 123,
//     dinariPercentageFee: 123})
//   res.json(result);

// });

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('DB Connection has been established successfully.');

//     // Explicitly synchronize the Country model
//     await Country.sync({ force: true, logging: console.log });
//     console.log('Country model synchronized successfully.');

//     // Sync the models
//     console.log('Synchronizing models...');
//     await sequelize.sync({ force: true });
//     console.log('All models were synchronized successfully.');

//     // Verify if the table exists
//     // const [results, metadata] = await sequelize.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public';");
//     // console.log('Query Results:', results);
//     // console.log('Tables in the database:', results.map((row: any) => row.table_name));

//     await Jurisdiction.sync({ force : true, logging: console.log});
//     console.log('Jurisdiction table was synchronized successfully.');
//     // Start the server
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();
