import { Router } from 'express';
import { createUsuario, getAllUsuarios, getUsuarioById, updateUsuario, deleteUsuario, requestPasswordReset, resetPassword } from '../controllers/usuario.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.post('/usuario', createUsuario);
router.get('/usuario', authMiddleware, getAllUsuarios);
router.get('/usuario/:id', authMiddleware, getUsuarioById);
router.put('/usuario/:id', authMiddleware, updateUsuario);
router.delete('/usuario/:id', authMiddleware, deleteUsuario);

router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;