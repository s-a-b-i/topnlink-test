import { Router } from 'express';
const router = Router();

// Import each function separately
import { 
    getWebsites,
    getRecentlyCreatedWebsites,
    viewWebsite,
    getWebsite,
    createWebsite,
    updateWebsite,
    deleteWebsite,
    discount,
    highlightMedia,
    getWebsitesForUserNotApproved,
    getWebsitesForUserApproved
} from '../controllers/websiteController.js';


// for advertisers
router.post('/get-all', getWebsites);
router.post('/recently-created/:limit', getRecentlyCreatedWebsites);
router.post('/view/:id', viewWebsite);

// Place specific routes before dynamic routes
router.post('/notApproved', getWebsitesForUserNotApproved);
router.post('/approved', getWebsitesForUserApproved);

router.put('/discount/:id', discount);
router.put('/highlight/:id', highlightMedia);

// Generic CRUD routes
router.post('/:id', getWebsite);
router.post('/', createWebsite);
router.put('/:id', updateWebsite);
router.delete('/:id', deleteWebsite);

export default router;