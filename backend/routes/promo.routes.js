import express from 'express';
import { getAllPromos,getRecentlyCreatedPromos,createPromo, getPromos, getPromo, updatePromo, deletePromo } from '../controllers/promo.controller.js';

const router = express.Router();

// for advertisers
router.get('/get-all', getAllPromos);
router.get('/recently-created/:limit', getRecentlyCreatedPromos);

router.post('/', createPromo);
router.post('/getPromos', getPromos);
router.get('/:id', getPromo);
router.put('/:id', updatePromo);
router.delete('/:id', deletePromo);

export default router;