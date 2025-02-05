import express from 'express';
import { createProfile, getProfile, updateProfile, deleteProfile } from '../controllers/profile.controller.js';
import multer from 'multer';

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const router = express.Router();

// Profile routes
router.post('/create', createProfile);
router.post('/get', getProfile);
router.put('/update/:id',upload.single('avatar'), updateProfile);
router.delete('/delete/:id', deleteProfile);


export default router;