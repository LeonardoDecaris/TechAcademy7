import { Router } from 'express';
import { createVeiculo, getAllVeiculos, getVeiculoById, updateVeiculo, deleteVeiculo, getVeiculoByUsuarioId, createVeiculoByUsuarioId, updateVeiculoByUsuarioId, deleteVeiculoByUsuarioId, } from '../controllers/veiculo.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.post('/veiculo', authMiddleware, createVeiculo);
router.get('/veiculo', authMiddleware, getAllVeiculos);
router.get('/veiculo/:id', authMiddleware, getVeiculoById);
router.put('/veiculo/:id',  updateVeiculo);
router.delete('/veiculo/:id', authMiddleware, deleteVeiculo);

router.get('/usuario/:usuarioId/veiculo', authMiddleware, getVeiculoByUsuarioId);
router.post('/usuario/:usuarioId/veiculo', createVeiculoByUsuarioId);
router.put('/usuario/:usuarioId/veiculo/:id', authMiddleware, updateVeiculoByUsuarioId);
router.delete('/usuario/:usuarioId/veiculo', authMiddleware, deleteVeiculoByUsuarioId);

export default router;