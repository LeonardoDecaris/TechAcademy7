import { Router } from 'express';
import { createStatus, getAllStatus, getStatusById, updateStatus, deleteStatus } from '../controllers/status.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.post('/status', authMiddleware, createStatus);
router.get('/status', authMiddleware, getAllStatus);
router.get('/status/:id', authMiddleware, getStatusById);
router.put('/status/:id', authMiddleware, updateStatus);
router.delete('/status/:id', authMiddleware, deleteStatus);

export default router;