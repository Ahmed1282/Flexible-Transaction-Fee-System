import { Router } from 'express';
import BillingController from '../controllers/billingController';

const router = Router();

// Route to create and fetch billing records
router.post('/fetchapi', BillingController.createAndFetchBilling);

export default router;
