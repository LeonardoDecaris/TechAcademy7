import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createTipoCarga, deleteTipoCarga, getAllTipoCarga, getTipoCargaById, updateTipoCarga } from '../controllers/tipo_carga.controller';

const router = Router();
router.post('/tipo_carga', authMiddleware, createTipoCarga);
router.get('/tipo_carga', authMiddleware, getAllTipoCarga);
router.get('/tipo_carga/:id', authMiddleware, getTipoCargaById);
router.put('/tipo_carga/:id', authMiddleware, updateTipoCarga);
router.delete('/tipo_carga/:id', authMiddleware, deleteTipoCarga);

export default router;