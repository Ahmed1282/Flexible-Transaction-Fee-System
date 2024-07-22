import { Router } from 'express';
import promotionController from '../controllers/promotionController';
import { validatePromotion } from '../middleware/promotionValidators';

const router = Router();

router.post('/create', validatePromotion, promotionController.createPromotion);
router.get('/getAll', promotionController.getAllPromotions);
router.get('/get/:id', promotionController.getPromotionById);
router.put('/update/:id', validatePromotion, promotionController.updatePromotion);
router.delete('/delete/:id', promotionController.deletePromotion);

export default router;
