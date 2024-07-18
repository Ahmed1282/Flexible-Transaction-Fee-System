import { Router } from 'express';
import {
  getAllJurisdictions,
  getJurisdictionById,
  createJurisdiction,
  updateJurisdiction,
  deleteJurisdiction,
} from '../controllers/jurisdictionController';

const router = Router();

router.get('/getAll', getAllJurisdictions);
router.get('/get/:id', getJurisdictionById);
router.post('/create', createJurisdiction);
router.put('/update/:id', updateJurisdiction);
router.delete('/delete/:id', deleteJurisdiction);

export default router;
