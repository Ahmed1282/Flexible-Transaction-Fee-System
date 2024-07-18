import { Router } from 'express';
import {
  getAllJurisdictions,
  getJurisdictionById,
  createJurisdiction,
  updateJurisdiction,
  deleteJurisdiction,
  getJurisdictionByName
} from '../controllers/jurisdictionController';
import { validateJurisdiction } from '../middleware/jurisdictionValidation';


const router = Router();


router.post('/create', validateJurisdiction, createJurisdiction);
router.put('/update/:id',validateJurisdiction, updateJurisdiction);
router.get('/getAll', getAllJurisdictions);
router.get('/get/:id', getJurisdictionById);
router.get('/getByName/:name', getJurisdictionByName);
router.delete('/delete/:id', deleteJurisdiction);

export default router;
