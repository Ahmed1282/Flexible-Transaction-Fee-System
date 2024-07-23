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
  async fetchBilling(req: Request, res: Response): Promise<void> {
    try {
      const billings = await billingService.fetchBilling();
      res.status(200).json(billings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching billing data' });
    }
  }
  // Add other methods like getBilling, updateBilling, deleteBilling as needed
}

export default new BillingController();
