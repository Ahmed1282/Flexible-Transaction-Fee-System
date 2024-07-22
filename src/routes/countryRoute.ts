import { Router } from 'express';
import countryController from '../controllers/countryController';
import { validateCountry } from '../middleware/countryValidators';

const router = Router();

router.post('/create', validateCountry, countryController.createCountry);
router.get('/getAll', countryController.getAllCountries);
router.get('/get/:id', countryController.getCountryById);
router.get('/getByName/:name', countryController.getCountryByName);
router.put('/update/:id', validateCountry, countryController.updateCountry);
router.delete('/delete/:id', countryController.deleteCountry);

export default router;
