import { Router } from 'express';
import promotionController from '../controllers/promotionController';
import { validatePromotion } from '../middleware/promotionValidators';

const router = Router();

router.post('/promotions', validatePromotion, promotionController.createPromotion);
router.get('/promotions', promotionController.getAllPromotions);
router.get('/promotions/:id', promotionController.getPromotionById);
router.put('/promotions/:id', validatePromotion, promotionController.updatePromotion);
router.delete('/promotions/:id', promotionController.deletePromotion);

export default router;
