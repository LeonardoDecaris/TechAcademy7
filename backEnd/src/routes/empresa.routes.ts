import { Router } from 'express';
import { createEmpresa, getAllEmpresas, getEmpresaById, updateEmpresa, deleteEmpresa } from '../controllers/empresa.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.post('/empresa', authMiddleware, createEmpresa);
router.get('/empresa', authMiddleware, getAllEmpresas);
router.get('/empresa/:id', authMiddleware, getEmpresaById);
router.put('/empresa/:id', authMiddleware, updateEmpresa);
router.delete('/empresa/:id', authMiddleware, deleteEmpresa);

export default router;