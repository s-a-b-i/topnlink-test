import express from 'express';
import { searchWebsites } from '../../controllers/advertiser/searchWebsite.controller.js';

const router = express.Router();

router.post('/search-websites', searchWebsites);

export default router;