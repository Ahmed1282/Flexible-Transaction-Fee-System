import { Router } from 'express';
import BillingController from '../controllers/billingController';

const router = Router();

router.post('/fetchapi', BillingController.fetchBilling);

export default router;
