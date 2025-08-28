import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createVeiculoTipoCarga, deleteVeiculoTipoCarga, getAllVeiculoTipoCarga, getVeiculoTipoCargaById, updateVeiculoTipoCarga } from '../controllers/veiculo_tipoCarga.controller';

const router = Router();
router.post('/veiculo_tipoCarga', authMiddleware, createVeiculoTipoCarga);
router.get('/veiculo_tipoCarga', authMiddleware, getAllVeiculoTipoCarga);
router.get('/veiculo_tipoCarga/:id', authMiddleware, getVeiculoTipoCargaById);
router.put('/veiculo_tipoCarga/:id', authMiddleware, updateVeiculoTipoCarga);
router.delete('/veiculo_tipoCarga/:id', authMiddleware, deleteVeiculoTipoCarga);

export default router;