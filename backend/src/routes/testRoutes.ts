import { Router } from 'express';
import { getTest, submitTest } from '../controllers/testController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/:id', authenticate, getTest);
router.post('/:id/submit', authenticate, submitTest);

export default router;
