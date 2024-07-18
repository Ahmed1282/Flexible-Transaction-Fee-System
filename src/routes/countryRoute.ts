import { Router } from 'express';
import countryController from '../controllers/countryController';
import { validateCountry } from '../middleware/countryValidators';

const router = Router();

router.post('/countries', validateCountry, countryController.createCountry);
router.get('/countries', countryController.getAllCountries);
router.get('/countries/:id', countryController.getCountryById);
router.put('/countries/:id', validateCountry, countryController.updateCountry);
router.delete('/countries/:id', countryController.deleteCountry);

export default router;
