import { Router } from 'express';
import { getAllDiscounts, getDiscountById, createDiscount, updateDiscount, deleteDiscount, verifyCoupon } from '../controllers/discountController';
import { validateDiscount, validateCoupon } from '../middleware/discountValidation';

const router = Router();


router.post('/create', validateDiscount, createDiscount);
router.put('/update/:id', validateDiscount, updateDiscount);
router.get('/getAll', getAllDiscounts);
router.get('/get/:id', getDiscountById);
router.delete('/delete/:id', deleteDiscount);
router.post('/verify', validateCoupon, verifyCoupon);

export default router;
