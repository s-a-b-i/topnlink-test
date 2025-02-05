import express from 'express';
import { requestEmailChange, verifyEmailChange } from '../controllers/emailChange.controller.js';

const router = express.Router();

router.post('/request-email-change', requestEmailChange);
router.post('/verify-email-change', verifyEmailChange);

export default router;