import { Router } from 'express';
import { createUsuario, getAllUsuarios, getUsuarioById, updateUsuario, deleteUsuario } from '../controllers/usuario.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.post('/usuario', createUsuario);
router.get('/usuario', getAllUsuarios);
router.get('/usuario/:id', getUsuarioById);
router.put('/usuario/:id', updateUsuario);
router.delete('/usuario/:id', authMiddleware, deleteUsuario);

export default router;