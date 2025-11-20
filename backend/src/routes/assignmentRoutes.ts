import { Router } from 'express';
import { getAssignmentResults, submitAssignment } from '../controllers/assignmentController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/:candidateId/submit', authenticate, submitAssignment);
router.get('/:id/results', authenticate, getAssignmentResults);

export default router;
