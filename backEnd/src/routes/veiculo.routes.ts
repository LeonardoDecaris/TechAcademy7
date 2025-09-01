import { Router } from 'express';
import { createVeiculo, getAllVeiculos, getVeiculoById, updateVeiculo, deleteVeiculo, getVeiculoByUsuarioId, createVeiculoByUsuarioId, updateVeiculoByUsuarioId, deleteVeiculoByUsuarioId, } from '../controllers/veiculo.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.post('/veiculo', authMiddleware, createVeiculo);
router.get('/veiculo', authMiddleware, getAllVeiculos);
router.get('/veiculo/:id', authMiddleware, getVeiculoById);
router.put('/veiculo/:id', authMiddleware, updateVeiculo);
router.delete('/veiculo/:id', authMiddleware, deleteVeiculo);

// GET: lista veículos do usuário
router.get('/usuario/:usuarioId/veiculo', authMiddleware, getVeiculoByUsuarioId);
// POST: vincula veículo ao usuário
router.post('/usuario/:usuarioId/veiculo', authMiddleware, createVeiculoByUsuarioId);
// PUT por usuário valida posse do veículo
router.put('/usuario/:usuarioId/veiculo/:id', authMiddleware, updateVeiculoByUsuarioId);
// DELETE: desvincula; ?hard=true apaga o veículo
router.delete('/usuario/:usuarioId/veiculo', authMiddleware, deleteVeiculoByUsuarioId);

export default router;