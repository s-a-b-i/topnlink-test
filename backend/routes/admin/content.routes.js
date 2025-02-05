import { Router } from 'express';
import {
  getWebsitesCountByStatus,
  searchWebsites,
  getWebsitesByStatus,
  changeWebsiteStatus,
  deleteWebsite,
  getWebsiteData,
  sendEmail,
  getUserById,
} from '../../controllers/admin/content.controller.js';

const router = Router();

router.post('/content/count', getWebsitesCountByStatus);
router.post('/content/search', searchWebsites);
router.post('/content/status', getWebsitesByStatus);
router.post('/content/change-status', changeWebsiteStatus);
router.post('/content/delete', deleteWebsite);
router.post('/content/data', getWebsiteData);
router.post('/content/send-email', sendEmail);
router.post('/content/get-user', getUserById);

export default router;