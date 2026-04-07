import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  getProfileHandler,
  updateProfileHandler,
} from '../controllers/settingsController';

const router = Router();

// All settings endpoints require authentication
router.get('/profile', authenticate, getProfileHandler);
router.put('/profile', authenticate, updateProfileHandler);

export default router;
