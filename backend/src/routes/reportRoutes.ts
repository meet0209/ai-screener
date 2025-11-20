import { Router } from 'express';
import { getScorecard } from '../controllers/reportController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = Router();

router.get('/:candidateId/scorecard', authenticate, authorizeRoles('admin', 'reviewer'), getScorecard);

export default router;
