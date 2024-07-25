import { Request, Response } from 'express';
import billingService from '../services/billingService';

class BillingController {
  async createAndFetchBilling(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const billings = await billingService.createAndFetchBilling(data);
      res.status(200).json(billings);
    } catch (error) {
      console.error("Error creating or fetching billing data:", error);
      res.status(500).json({ message: 'Error creating or fetching billing data' });
    }
  }
}

export default new BillingController();
