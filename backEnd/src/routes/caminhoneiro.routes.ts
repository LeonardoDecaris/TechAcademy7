import { Router } from 'express';
import { createCaminhoneiro, getAllCaminhoneiros, getCaminhoneiroById, updateCaminhoneiro, deleteCaminhoneiro } from '../controllers/caminhoneiro.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.post('/caminhoneiro', authMiddleware, createCaminhoneiro);
router.get('/caminhoneiro', authMiddleware, getAllCaminhoneiros);
router.get('/caminhoneiro/:id', authMiddleware, getCaminhoneiroById);
router.put('/caminhoneiro/:id', authMiddleware, updateCaminhoneiro);
router.delete('/caminhoneiro/:id', authMiddleware, deleteCaminhoneiro);

export default router;