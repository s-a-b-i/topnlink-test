import { Router } from 'express';
import {
  searchUsers,
  getAllUsers,
  getUsersByStatus,
  getUsersByVerification,
  changeUserStatus,
  deleteUser,
  sendEmailByAdmin,
} from '../../controllers/admin/userMang.controller.js';

const router = Router();

router.post('/users/search', searchUsers);
router.post('/users/all', getAllUsers);
router.post('/users/status', getUsersByStatus);
router.post('/users/verification', getUsersByVerification);
router.post('/users/send-email', sendEmailByAdmin);
router.put('/users/change-status', changeUserStatus);
router.delete('/users/delete', deleteUser);

export default router;