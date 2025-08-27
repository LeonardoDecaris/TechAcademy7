import { Router } from 'express';
import { createVeiculo, getAllVeiculos, getVeiculoById, updateVeiculo, deleteVeiculo } from '../controllers/veiculo.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.post('/veiculo', authMiddleware, createVeiculo);
router.get('/veiculo', authMiddleware, getAllVeiculos);
router.get('/veiculo/:id', authMiddleware, getVeiculoById);
router.put('/veiculo/:id', authMiddleware, updateVeiculo);
router.delete('/veiculo/:id', authMiddleware, deleteVeiculo);

export default router;