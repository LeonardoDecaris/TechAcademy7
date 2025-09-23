import { Router } from 'express';
import { createFrete, getAllFretes, getFreteById, updateFrete, deleteFrete,getFretesByCaminhoneiro } from '../controllers/frete.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.post('/frete', authMiddleware, createFrete);
router.get('/frete', getAllFretes);
router.get('/frete/caminhoneiro/:caminhoneiroId', authMiddleware, getFretesByCaminhoneiro);
router.get('/frete/:id', authMiddleware, getFreteById);
router.put('/frete/:id', authMiddleware, updateFrete);
router.delete('/frete/:id', authMiddleware, deleteFrete);


export default router;