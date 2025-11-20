import { Router } from 'express';
import assignmentRoutes from './assignmentRoutes.js';
import authRoutes from './authRoutes.js';
import candidateRoutes from './candidateRoutes.js';
import reportRoutes from './reportRoutes.js';
import testRoutes from './testRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/candidates', candidateRoutes);
router.use('/tests', testRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/reports', reportRoutes);

export default router;
