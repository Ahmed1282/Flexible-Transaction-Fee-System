import { Request, Response } from 'express';
import billingService from '../services/billingService';

class BillingController {
  async createBilling(req: Request, res: Response) {
    try {
      const billing = await billingService.createBilling(req.body);
      res.status(201).json(billing);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Add other methods like getBilling, updateBilling, deleteBilling as needed
}

export default new BillingController();
