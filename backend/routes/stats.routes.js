import express from 'express';
import { createOrUpdateStats, getStatsByYearAndMonth, getLast30DaysStats,getLast12MonthsStats } from '../controllers/stats.controller.js';

const router = express.Router();

// Stats Routes
router.post('/', createOrUpdateStats);
router.post('/get-monthly', getStatsByYearAndMonth);
router.post('/get-last30days', getLast30DaysStats);
router.post('/get-last12months', getLast12MonthsStats);

export default router;