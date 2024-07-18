import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import promotionService from '../services/promotionService';

class PromotionController {
  async createPromotion(req: Request, res: Response) {
    try {
      const promotion = await promotionService.createPromotion(req.body);
      res.status(StatusCodes.CREATED).json(promotion);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }

  async getAllPromotions(req: Request, res: Response) {
    try {
      const promotions = await promotionService.getAllPromotions();
      res.status(StatusCodes.OK).json(promotions);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }

  async getPromotionById(req: Request, res: Response) {
    try {
      const promotion = await promotionService.getPromotionById(Number(req.params.id));
      if (!promotion) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Promotion not found' });
      } else {
        res.status(StatusCodes.OK).json(promotion);
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }

  async updatePromotion(req: Request, res: Response) {
    try {
      const promotion = await promotionService.updatePromotion(Number(req.params.id), req.body);
      if (!promotion) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Promotion not found' });
      } else {
        res.status(StatusCodes.OK).json(promotion);
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }

  async deletePromotion(req: Request, res: Response) {
    try {
      const success = await promotionService.deletePromotion(Number(req.params.id));
      if (success) {
        res.status(StatusCodes.NO_CONTENT).send();
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Promotion not found' });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }
}

export default new PromotionController();
