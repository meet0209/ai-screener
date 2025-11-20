import { Router } from 'express';
import {
  exportCandidatesCsv,
  generateTest,
  getCandidate,
  listCandidates,
  reviewCandidate,
  uploadCandidate,
} from '../controllers/candidateController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.post('/upload', authenticate, authorizeRoles('admin'), upload.single('resume'), uploadCandidate);
router.get('/', authenticate, authorizeRoles('admin', 'reviewer'), listCandidates);
router.get('/export/csv', authenticate, authorizeRoles('admin'), exportCandidatesCsv);
router.get('/:id', authenticate, authorizeRoles('admin', 'reviewer'), getCandidate);
router.post('/:id/generate-test', authenticate, authorizeRoles('admin'), generateTest);
router.post('/:id/review', authenticate, authorizeRoles('admin', 'reviewer'), reviewCandidate);

export default router;
