import { Router } from 'express';
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  changeFAQStatus,
  searchFAQsByQuestionAdmin,
  getFAQsByCategory,
  getAllCategoriesPublic,
  getFAQsByCategoryPublic,
  searchFAQsByQuestion,
} from '../../controllers/admin/faq.controller.js';

const router = Router();

// Admin routes
router.post('/category/add', addCategory);
router.post('/category/delete', deleteCategory);
router.post('/category/all', getAllCategories);
router.post('/faq/create', createFAQ);
router.post('/faq/update', updateFAQ);
router.post('/faq/delete', deleteFAQ);
router.post('/faq/change-status', changeFAQStatus);
router.post('/faq/search', searchFAQsByQuestionAdmin);
router.post('/faq/category', getFAQsByCategory);


// Public routes
router.get('/public/categories', getAllCategoriesPublic);
router.get('/public/faqs/search', searchFAQsByQuestion);
router.get('/public/faqs/:categoryId', getFAQsByCategoryPublic);



export default router;